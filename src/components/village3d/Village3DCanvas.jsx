import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VILLAGE_HOTSPOTS } from '../../data/villageData';
import { 
  createVillageRoadTexture, 
  createAncientBrickTexture, 
  createRoofTileTexture, 
  createPlasterWallTexture, 
  createWoodDoorTexture, 
  createInlaidMuralTexture, 
  createBougainvilleaTexture,
  createPhucInlayTexture,
  createLotusInlayPlaqueTexture,
  createRoundTrayInlayTexture,
  createWorkshopSignTexture,
  createCraftingStandeeTexture,
  createGateInscriptionTexture,
  createGateArchPlaqueTexture,
  createHeritageFlagTexture
} from '../../utils/villageEnvironmentTextures';

export const Village3DCanvas = ({
  onPlayerPositionChange = () => {},
  onPlayerRotationChange = () => {},
  onNearHotspot = () => {},
  activeNearHotspot = null,
  onInteract = () => {},
  onOpenArtisan = () => {},
  onOpenCrafting = () => {},
  virtualMove = { x: 0, z: 0 },
  isVirtualSprinting = false,
  teleportTarget = null,
  className = ''
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Three.js Core Refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const reqIdRef = useRef(null);

  // Player Character & Camera Rig Refs
  const playerMeshRef = useRef(null);
  const playerPartsRef = useRef({ leftLeg: null, rightLeg: null, leftArm: null, rightArm: null, braid: null });
  const playerStateRef = useRef({
    x: 0,
    y: 0,
    z: 9.5, // Start on the flagstone street looking forward towards the workshop and gate
    targetYaw: 0, // Facing North (-Z) down the village street
    yaw: 0,
    speed: 0,
    isMoving: false,
    walkTime: 0
  });

  const cameraControlRef = useRef({
    orbitYaw: 0, // Looking straight along -Z down the village road
    orbitPitch: 0.18, // Eye level slightly elevated
    distance: 5.4, // Natural 3rd-person RPG follow distance
    targetDistance: 5.4,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0
  });

  const keysPressedRef = useRef({});
  const hotspotMeshesRef = useRef([]);
  const npcsRef = useRef([]);

  // Teleport listener
  useEffect(() => {
    if (teleportTarget && playerStateRef.current) {
      playerStateRef.current.x = teleportTarget.position[0];
      playerStateRef.current.z = teleportTarget.position[2] + 2.4;
      playerStateRef.current.speed = 0;
    }
  }, [teleportTarget]);

  // 1. Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // SCENE & ATMOSPHERIC MORNING MIST
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xDED5C6); // Soft warm morning haze
    scene.fog = new THREE.FogExp2(0xDED5C6, 0.016);
    sceneRef.current = scene;

    // CAMERA (48° natural FOV with depth perspective)
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 160);
    camera.position.set(0, 2.8, 15.0);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // LIGHTING (8:30 AM Golden Morning Sun - Warm Village Heritage Atmosphere)
    const ambientLight = new THREE.HemisphereLight(0xFDF6EA, 0x484236, 1.35);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFE5B4, 2.9);
    sunLight.position.set(22, 34, 18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 90;
    const shadowD = 38;
    sunLight.shadow.camera.left = -shadowD;
    sunLight.shadow.camera.right = shadowD;
    sunLight.shadow.camera.top = shadowD;
    sunLight.shadow.camera.bottom = -shadowD;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    // Warm bounce light from terracotta tiled roofs
    const bounceLight = new THREE.DirectionalLight(0xE5AA70, 0.65);
    bounceLight.position.set(-15, -4, -10);
    scene.add(bounceLight);

    // BUILD THE ENTIRE 3D VILLAGE WORLD
    buildRealisticVillage(scene);

    // BUILD 3D THIRD-PERSON PLAYER CHARACTER
    const playerGroup = buildPlayerCharacter();
    scene.add(playerGroup);
    playerMeshRef.current = playerGroup;

    // KEYBOARD EVENT LISTENERS
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      keysPressedRef.current[key] = true;

      if (key === 'e') {
        if (activeNearHotspot) {
          if (activeNearHotspot.id === 'artisan') onOpenArtisan();
          else if (activeNearHotspot.id === 'craft') onOpenCrafting();
          else onInteract();
        } else {
          onInteract();
        }
      }
    };

    const handleKeyUp = (e) => {
      keysPressedRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // MAIN ANIMATION LOOP
    let lastTime = performance.now();

    const animate = (time) => {
      reqIdRef.current = requestAnimationFrame(animate);
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Update Player Physics & Follow Camera
      updatePlayerAndCamera(delta);

      // Animate NPCs
      updateVillageNPCs(delta);

      renderer.render(scene, camera);
    };

    reqIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      renderer.dispose();
    };
  }, []);

  // =========================================================================
  // 2. PROCEDURAL 3D ARCHITECTURE & ENVIRONMENT BUILDER
  // =========================================================================
  function buildRealisticVillage(scene) {
    // 1. PROCEDURAL CANVAS TEXTURES
    const roadTex = new THREE.CanvasTexture(createVillageRoadTexture());
    roadTex.wrapS = THREE.RepeatWrapping;
    roadTex.wrapT = THREE.RepeatWrapping;
    roadTex.repeat.set(2, 18);
    const roadMat = new THREE.MeshStandardMaterial({
      map: roadTex,
      roughness: 0.82,
      metalness: 0.04
    });

    const ancientBrickTex = new THREE.CanvasTexture(createAncientBrickTexture());
    ancientBrickTex.wrapS = THREE.RepeatWrapping;
    ancientBrickTex.wrapT = THREE.RepeatWrapping;
    ancientBrickTex.repeat.set(4, 4);
    const ancientBrickMat = new THREE.MeshStandardMaterial({
      map: ancientBrickTex,
      roughness: 0.88,
      metalness: 0.02
    });

    const roofTileTex = new THREE.CanvasTexture(createRoofTileTexture());
    roofTileTex.wrapS = THREE.RepeatWrapping;
    roofTileTex.wrapT = THREE.RepeatWrapping;
    roofTileTex.repeat.set(6, 6);
    const roofTileMat = new THREE.MeshStandardMaterial({
      map: roofTileTex,
      roughness: 0.75,
      metalness: 0.04
    });

    const plasterTex = new THREE.CanvasTexture(createPlasterWallTexture());
    plasterTex.wrapS = THREE.RepeatWrapping;
    plasterTex.wrapT = THREE.RepeatWrapping;
    plasterTex.repeat.set(3, 2);
    const plasterMat = new THREE.MeshStandardMaterial({
      map: plasterTex,
      roughness: 0.9,
      metalness: 0.02
    });

    const woodDoorTex = new THREE.CanvasTexture(createWoodDoorTexture());
    const woodDoorMat = new THREE.MeshStandardMaterial({
      map: woodDoorTex,
      roughness: 0.65,
      metalness: 0.12
    });

    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x382215, roughness: 0.72 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x6E665E, roughness: 0.85 });

    // A. GROUND TERRAIN (Natural Earth & Grass)
    const terrainGeo = new THREE.PlaneGeometry(120, 120);
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x485641, // Natural Vietnamese village countryside lawn
      roughness: 0.95
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    scene.add(terrain);

    // B. AUTHENTIC PAVED VILLAGE ROAD (Đường lát gạch cổ)
    // Width: 7.6m, runs from Z = 16 down to Z = -38 through the village gate
    const roadGeo = new THREE.PlaneGeometry(7.6, 64);
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.set(0, 0.02, -10);
    roadMesh.receiveShadow = true;
    scene.add(roadMesh);

    // Stone Sidewalk Curbs along both sides
    const curbGeo = new THREE.BoxGeometry(0.35, 0.14, 64);
    const curbL = new THREE.Mesh(curbGeo, stoneMat);
    curbL.position.set(-3.95, 0.07, -10);
    curbL.receiveShadow = true;
    scene.add(curbL);

    const curbR = new THREE.Mesh(curbGeo, stoneMat);
    curbR.position.set(3.95, 0.07, -10);
    curbR.receiveShadow = true;
    scene.add(curbR);

    // Branching paved alley leading into the village garden
    const sideAlleyGeo = new THREE.PlaneGeometry(24, 4.2);
    const sideAlley = new THREE.Mesh(sideAlleyGeo, roadMat);
    sideAlley.rotation.x = -Math.PI / 2;
    sideAlley.position.set(0, 0.025, 2.5);
    sideAlley.receiveShadow = true;
    scene.add(sideAlley);

    // C. CỔNG LÀNG CỔ CHUÔN NGỌ (Archway Gate at Z = -4.0, directly in front of the player!)
    buildAncientArchGate(scene, ancientBrickMat, roofTileMat, darkWoodMat, stoneMat);

    // D. XƯỞNG KHẢM TRAI NGHỆ NHÂN (On the Left side of the street, matching Image 5 & Photo 2)
    buildArtisanWorkshopStreet(scene, darkWoodMat, stoneMat, roofTileMat, woodDoorMat);

    // E. GIAN TRẢI NGHIỆM CHẾ TÁC & NHÀ CỔ DI SẢN (On the Right side of the street, matching Image 5)
    buildCraftingPavilionStreet(scene, darkWoodMat, stoneMat, plasterMat, roofTileMat);

    // F. DÃY NHÀ CỔ TRUYỀN THỐNG TIẾP NỐI PHÍA SAU CỔNG LÀNG
    buildInnerVillageStreet(scene, plasterMat, roofTileMat, woodDoorMat, darkWoodMat, stoneMat);

    // G. NHÀ TRƯNG BÀY BÁCH LIÊN VỚI BỨC TRANH THUẬN BUỒM XUÔI GIÓ (Photo 3)
    buildExhibitionGallery(scene, darkWoodMat, plasterMat);

    // H. CÂY ĐA CỔ THỤ, GIÀN HOA GIẤY & TIỂU CẢNH LÀNG QUÊ
    buildVillageVegetationAndProps(scene);

    // I. CÁC ĐIỂM SÁNG TƯƠNG TÁC (Interactive Hotspot Beacons & Exclamation Rings)
    buildHotspotBeacons(scene);

    // J. NPC DÂN LÀNG & DU KHÁCH ĐI LẠI TRÊN ĐƯỜNG
    buildVillageNPCs(scene);
  }

  // C. BUILD ANCIENT ARCH VILLAGE GATE (Cổng Làng Cổ Chuôn Ngọ - Image 5 & Photo 1)
  function buildAncientArchGate(scene, brickMat, roofMat, woodMat, stoneMat) {
    const gateGroup = new THREE.Group();
    gateGroup.position.set(0, 0, -4.0); // Spanning across the road directly ahead of the player!

    const mainWallH = 6.4;
    const archRadius = 2.4;
    const wallThick = 2.2;

    // Left Arch Pier (Trụ cổng cổ gạch nung bên trái)
    const pierL = new THREE.Mesh(new THREE.BoxGeometry(3.6, mainWallH, wallThick), brickMat);
    pierL.position.set(-4.1, mainWallH / 2, 0);
    pierL.castShadow = true;
    pierL.receiveShadow = true;
    gateGroup.add(pierL);

    // Right Arch Pier (Trụ cổng cổ gạch nung bên phải)
    const pierR = new THREE.Mesh(new THREE.BoxGeometry(3.6, mainWallH, wallThick), brickMat);
    pierR.position.set(4.1, mainWallH / 2, 0);
    pierR.castShadow = true;
    pierR.receiveShadow = true;
    gateGroup.add(pierR);

    // Arch Spandrel & Top Masonry Wall
    const topLintel = new THREE.Mesh(new THREE.BoxGeometry(11.8, 2.5, wallThick), brickMat);
    topLintel.position.set(0, mainWallH + 1.25, 0);
    topLintel.castShadow = true;
    gateGroup.add(topLintel);

    // Semicircular Arch Trim (Vòm cuốn cổng gạch cổ)
    const archTrimGeo = new THREE.TorusGeometry(archRadius, 0.32, 12, 28, Math.PI);
    const archTrim = new THREE.Mesh(archTrimGeo, stoneMat);
    archTrim.position.set(0, 4.0, wallThick / 2 + 0.05);
    gateGroup.add(archTrim);

    const archTrimBack = new THREE.Mesh(archTrimGeo, stoneMat);
    archTrimBack.position.set(0, 4.0, -wallThick / 2 - 0.05);
    gateGroup.add(archTrimBack);

    // 1. Plaque with Chinese Characters "大高火" (Đại Cao Hỏa - exact characters from Dan Tri Photo 1!)
    const archPlaqueTex = new THREE.CanvasTexture(createGateArchPlaqueTexture());
    const archPlaqueMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 0.8),
      new THREE.MeshBasicMaterial({ map: archPlaqueTex })
    );
    archPlaqueMesh.position.set(0, 5.0, wallThick / 2 + 0.14);
    gateGroup.add(archPlaqueMesh);

    // 2. Main Inscription Plaque "Làng nghề Chuôn Ngọ" (Image 5)
    const signTex = new THREE.CanvasTexture(createGateInscriptionTexture());
    const signFace = new THREE.Mesh(
      new THREE.PlaneGeometry(4.8, 1.1),
      new THREE.MeshBasicMaterial({ map: signTex })
    );
    signFace.position.set(0, mainWallH + 0.9, wallThick / 2 + 0.16);
    gateGroup.add(signFace);

    // Upper Bell Tower / Pavilion Roof (Vọng lâu mái cong ngói vảy rêu phong)
    const pavBase = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.35, 2.8), stoneMat);
    pavBase.position.set(0, mainWallH + 2.5, 0);
    gateGroup.add(pavBase);

    [-2.2, 2.2].forEach(px => {
      [-1.1, 1.1].forEach(pz => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 2.2, 12), woodMat);
        col.position.set(px, mainWallH + 3.6, pz);
        col.castShadow = true;
        gateGroup.add(col);
      });
    });

    const roofGeo = new THREE.ConeGeometry(4.4, 1.8, 4);
    const pavRoof = new THREE.Mesh(roofGeo, roofMat);
    pavRoof.rotation.y = Math.PI / 4;
    pavRoof.position.set(0, mainWallH + 5.3, 0);
    pavRoof.scale.set(1.5, 1.0, 1.1);
    pavRoof.castShadow = true;
    gateGroup.add(pavRoof);

    // Side Boundary Stone Pillars with Lotus Bud Finials (Trụ biểu búp sen - Photo 1)
    [-6.8, 6.8].forEach(sx => {
      const col = new THREE.Mesh(new THREE.BoxGeometry(1.2, 5.4, 1.2), stoneMat);
      col.position.set(sx, 2.7, 0);
      col.castShadow = true;
      gateGroup.add(col);

      const lotusBud = new THREE.Mesh(new THREE.SphereGeometry(0.46, 12, 12), stoneMat);
      lotusBud.position.set(sx, 5.7, 0);
      lotusBud.scale.set(0.8, 1.45, 0.8);
      gateGroup.add(lotusBud);
    });

    scene.add(gateGroup);
  }

  // D. BUILD ARTISAN WORKSHOP (Xưởng Khảm Trai Nghệ Nhân bên trái đường - Image 5 & Photo 2)
  function buildArtisanWorkshopStreet(scene, woodMat, stoneMat, roofMat, doorMat) {
    const wsGroup = new THREE.Group();
    wsGroup.position.set(-5.6, 0, 2.2); // Positioned directly along the left curb of the village street!

    // Raised brick foundation porch
    const porchGeo = new THREE.BoxGeometry(4.8, 0.35, 7.6);
    const porch = new THREE.Mesh(porchGeo, stoneMat);
    porch.position.set(0, 0.18, 0);
    porch.receiveShadow = true;
    wsGroup.add(porch);

    // Back & Side walls with traditional wood louvers (matching Photo 2)
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.8, 7.4), woodMat);
    backWall.position.set(-2.25, 2.05, 0);
    wsGroup.add(backWall);

    const doorMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), doorMat);
    doorMesh.rotation.y = Math.PI / 2;
    doorMesh.position.set(-2.05, 1.75, -0.6);
    wsGroup.add(doorMesh);

    // 4 Front Wooden Pillars facing the street
    [-3.2, -1.0, 1.0, 3.2].forEach(pz => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 3.8, 12), woodMat);
      col.position.set(1.8, 2.05, pz);
      col.castShadow = true;
      wsGroup.add(col);
    });

    // Terracotta Overhang Roof
    const roofGeo = new THREE.ConeGeometry(5.2, 2.2, 4);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 4.6, 0);
    roof.scale.set(1.2, 0.9, 1.6);
    roof.castShadow = true;
    wsGroup.add(roof);

    // CASCADING PINK BOUGAINVILLEA VINES OVER ROOF (Image 5)
    const bougTex = new THREE.CanvasTexture(createBougainvilleaTexture());
    const bougMat = new THREE.MeshStandardMaterial({
      map: bougTex,
      transparent: true,
      alphaTest: 0.15,
      side: THREE.DoubleSide
    });
    const bougCanopy = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 1.8), bougMat);
    bougCanopy.position.set(1.6, 4.1, 0);
    bougCanopy.rotation.y = -Math.PI / 2;
    wsGroup.add(bougCanopy);

    // Front Wooden Signboard: "Xưởng khảm trai" (Image 5)
    const signTex = new THREE.CanvasTexture(createWorkshopSignTexture());
    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 0.9),
      new THREE.MeshBasicMaterial({ map: signTex })
    );
    signMesh.rotation.y = -Math.PI / 2 + 0.15; // angled slightly towards the approaching player
    signMesh.position.set(1.85, 3.5, 0.2);
    wsGroup.add(signMesh);

    // ARTISAN WORKBENCH & SEATED ARTISAN FIGURE (Nghệ nhân ngồi cưa cẩn xà cừ - Image 5 & Photo 2)
    const bench = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 1.1), woodMat);
    bench.position.set(0.6, 0.75, 0.4);
    bench.castShadow = true;
    bench.receiveShadow = true;
    wsGroup.add(bench);

    // Blue Task Lamp (from Photo 2)
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x1E88E5, roughness: 0.35, metalness: 0.6 });
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.05, 16), lampMat);
    lampBase.position.set(1.1, 1.18, 0.7);
    wsGroup.add(lampBase);

    const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.22, 16), lampMat);
    lampShade.rotation.z = -Math.PI / 3;
    lampShade.position.set(0.85, 1.45, 0.5);
    wsGroup.add(lampShade);

    // Warm desk spotlight directly illuminating the work tray
    const taskSpot = new THREE.SpotLight(0xFFF1D0, 3.8, 5, Math.PI / 4, 0.25, 1.0);
    taskSpot.position.set(0.85, 1.5, 0.5);
    taskSpot.target.position.set(0.5, 1.18, 0.3);
    wsGroup.add(taskSpot);
    wsGroup.add(taskSpot.target);

    // Seated Artisan NPC Figure
    const artisanGroup = buildDetailedArtisanFigure();
    artisanGroup.position.set(0.6, 0.45, -0.4);
    wsGroup.add(artisanGroup);

    // Floating Interaction Exclamation Beacon (!) above the Artisan
    const beaconGroup = createExclamationMarker(0xE06D53);
    beaconGroup.position.set(0.6, 2.5, 0.2);
    wsGroup.add(beaconGroup);

    // DISPLAYED MASTERPIECE 1: Framed Mother-of-pearl Lotus Painting on Easel (Image 5)
    const lotusTex = new THREE.CanvasTexture(createLotusInlayPlaqueTexture());
    const lotusEasel = buildPaintingEasel(lotusTex, 1.4, 1.7);
    lotusEasel.position.set(1.9, 0.35, 2.4);
    lotusEasel.rotation.y = -Math.PI / 2 - 0.2; // Facing the street
    wsGroup.add(lotusEasel);

    // DISPLAYED MASTERPIECE 2: Round Inlay Platter on Stand (Photo 4 & Image 5)
    const roundTex = new THREE.CanvasTexture(createRoundTrayInlayTexture());
    const roundStand = buildPlateStand(roundTex, 0.65);
    roundStand.position.set(1.85, 0.35, -2.2);
    roundStand.rotation.y = -Math.PI / 2 + 0.15;
    wsGroup.add(roundStand);

    // DISPLAYED MASTERPIECE 3: Framed Mother-of-pearl "Phúc" Artwork on back wall (Photo 2)
    const phucTex = new THREE.CanvasTexture(createPhucInlayTexture());
    const phucMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1.5),
      new THREE.MeshBasicMaterial({ map: phucTex })
    );
    phucMesh.rotation.y = Math.PI / 2;
    phucMesh.position.set(-2.0, 2.4, 1.6);
    wsGroup.add(phucMesh);

    scene.add(wsGroup);
  }

  // E. BUILD CRAFTING PAVILION & HERITAGE STANDEE (Gian Trải Nghiệm bên phải đường - Image 5)
  function buildCraftingPavilionStreet(scene, woodMat, stoneMat, plasterMat, roofMat) {
    const cpGroup = new THREE.Group();
    cpGroup.position.set(5.6, 0, 2.2); // Positioned directly along the right curb!

    // Porch
    const porch = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.35, 7.6), stoneMat);
    porch.position.set(0, 0.18, 0);
    porch.receiveShadow = true;
    cpGroup.add(porch);

    // Traditional ancient house wall
    const wallMesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.8, 7.4), plasterMat);
    wallMesh.position.set(2.25, 2.05, 0);
    wallMesh.castShadow = true;
    cpGroup.add(wallMesh);

    // 4 Front Timber Pillars
    [-3.2, -1.0, 1.0, 3.2].forEach(pz => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 3.8, 12), woodMat);
      col.position.set(-1.8, 2.05, pz);
      col.castShadow = true;
      cpGroup.add(col);
    });

    // Roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(5.2, 2.2, 4), roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 4.6, 0);
    roof.scale.set(1.2, 0.9, 1.6);
    roof.castShadow = true;
    cpGroup.add(roof);

    // Hanging Red Lanterns
    const lanternMat = new THREE.MeshStandardMaterial({
      color: 0xE52E2E,
      emissive: 0x991B1B,
      emissiveIntensity: 0.65
    });
    [-2.2, 0, 2.2].forEach(pz => {
      const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), lanternMat);
      lantern.scale.set(1, 1.3, 1);
      lantern.position.set(-1.8, 3.5, pz);
      cpGroup.add(lantern);
    });

    // Traditional Red & Gold Festival Banner ("Cờ Hội Di Sản" - Image 5)
    const flagTex = new THREE.CanvasTexture(createHeritageFlagTexture());
    const flagMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 1.8),
      new THREE.MeshBasicMaterial({ map: flagTex, side: THREE.DoubleSide })
    );
    flagMesh.rotation.y = -Math.PI / 6;
    flagMesh.position.set(-1.95, 2.6, 2.6);
    cpGroup.add(flagMesh);

    // WOODEN A-FRAME STANDEE: "Trải nghiệm chế tác khảm trai" (Image 5)
    const standeeTex = new THREE.CanvasTexture(createCraftingStandeeTexture());
    const standeeGroup = new THREE.Group();
    standeeGroup.position.set(-1.9, 0.35, 0.8);
    standeeGroup.rotation.y = Math.PI / 2 - 0.2; // Facing the approaching player!

    const standeeBoard = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 1.6),
      new THREE.MeshBasicMaterial({ map: standeeTex })
    );
    standeeBoard.position.set(0, 1.0, 0);
    standeeGroup.add(standeeBoard);

    // Wooden A-frame easel legs
    const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.9, 8), woodMat);
    legL.position.set(-0.55, 0.95, -0.15);
    standeeGroup.add(legL);

    const legR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.9, 8), woodMat);
    legR.position.set(0.55, 0.95, -0.15);
    standeeGroup.add(legR);

    // Floating Interaction Beacon (!) above the Crafting Standee
    const craftBeacon = createExclamationMarker(0x28A745);
    craftBeacon.position.set(0, 2.3, 0);
    standeeGroup.add(craftBeacon);

    cpGroup.add(standeeGroup);

    // Crafting table inside the pavilion
    const craftTable = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 2.4), woodMat);
    craftTable.position.set(0, 0.75, -1.2);
    cpGroup.add(craftTable);

    // Trays of raw mother-of-pearl shells
    const shellTray = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.06, 0.7),
      new THREE.MeshStandardMaterial({ color: 0xF5F0E6, roughness: 0.3, metalness: 0.4 })
    );
    shellTray.position.set(-0.2, 1.18, -1.2);
    cpGroup.add(shellTray);

    scene.add(cpGroup);
  }

  // F. BUILD INNER VILLAGE STREET BEYOND THE GATE (Nhà cổ, ngõ gạch phía sau cổng làng)
  function buildInnerVillageStreet(scene, plasterMat, roofMat, doorMat, woodMat, stoneMat) {
    const innerHouses = [
      { x: -7.5, z: -14, w: 7, h: 4.6, d: 8, name: 'Nhà Cổ Nghệ Nhân' },
      { x: -7.5, z: -25, w: 7, h: 4.8, d: 8, name: 'Xưởng Gỗ Truyền Thống' },
      { x: 7.5, z: -25, w: 7, h: 4.6, d: 8, name: 'Cửa Hàng Quà Lưu Niệm' }
    ];

    innerHouses.forEach(h => {
      const house = new THREE.Group();
      house.position.set(h.x, 0, h.z);

      const plinth = new THREE.Mesh(new THREE.BoxGeometry(h.w + 0.6, 0.35, h.d + 0.8), stoneMat);
      plinth.position.y = 0.18;
      house.add(plinth);

      const wallMesh = new THREE.Mesh(new THREE.BoxGeometry(h.w, h.h, h.d), plasterMat);
      wallMesh.position.y = 0.35 + h.h / 2;
      wallMesh.castShadow = true;
      house.add(wallMesh);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(h.w * 0.7, 2.2, 4), roofMat);
      roof.rotation.y = Math.PI / 4;
      roof.position.set(0, 0.35 + h.h + 1.1, 0);
      roof.scale.set(h.w / (h.w * 0.6), 1.0, (h.d + 1.2) / (h.w * 0.6));
      roof.castShadow = true;
      house.add(roof);

      const isLeft = h.x < 0;
      const doorMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.0), doorMat);
      doorMesh.rotation.y = isLeft ? Math.PI / 2 : -Math.PI / 2;
      doorMesh.position.set(isLeft ? h.w / 2 + 0.05 : -h.w / 2 - 0.05, 1.85, 0);
      house.add(doorMesh);

      scene.add(house);
    });
  }

  // G. BUILD EXHIBITION GALLERY WITH "THUẬN BUỒM XUÔI GIÓ" MURAL (Photo 3)
  function buildExhibitionGallery(scene, woodMat, plasterMat) {
    const galleryGroup = new THREE.Group();
    galleryGroup.position.set(7.8, 0, -14); // Inner village right side

    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.35, 9),
      new THREE.MeshStandardMaterial({ color: 0x3E2415, roughness: 0.7 })
    );
    floor.position.y = 0.18;
    galleryGroup.add(floor);

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(7.6, 4.4, 0.3), plasterMat);
    backWall.position.set(0, 2.35, -4.2);
    galleryGroup.add(backWall);

    // 4 Corner Pillars
    [[-3.6, -3.8], [-3.6, 3.8], [3.6, -3.8], [3.6, 3.8]].forEach(([cx, cz]) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 4.4, 12), woodMat);
      col.position.set(cx, 2.35, cz);
      galleryGroup.add(col);
    });

    // MASTERPIECE MURAL "THUẬN BUỒM XUÔI GIÓ" (Photo 3)
    const muralTex = new THREE.CanvasTexture(createInlaidMuralTexture());
    const muralMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(4.8, 2.4),
      new THREE.MeshBasicMaterial({ map: muralTex })
    );
    muralMesh.position.set(0, 2.4, -4.0);
    galleryGroup.add(muralMesh);

    // Dedicated warm spotlight on the masterpiece
    const muralLight = new THREE.SpotLight(0xFFEAA7, 3.5, 8, Math.PI / 3, 0.3, 1.0);
    muralLight.position.set(0, 4.2, -1.5);
    muralLight.target.position.set(0, 2.4, -4.0);
    galleryGroup.add(muralLight);
    galleryGroup.add(muralLight.target);

    // Interaction beacon for gallery
    const galBeacon = createExclamationMarker(0x8E44AD);
    galBeacon.position.set(0, 2.8, -0.5);
    galleryGroup.add(galBeacon);

    scene.add(galleryGroup);
  }

  // H. CÂY CỔ THỤ, GIÀN HOA GIẤY & TIỂU CẢNH LÀNG QUÊ (Photo 1)
  function buildVillageVegetationAndProps(scene) {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x483222, roughness: 0.85 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x2A4E31, roughness: 0.75 });

    // Large Shade Banyan Trees over the Gate (matching Photo 1!)
    [[-5.8, -4.2], [5.8, -4.2], [-6.2, 8.5], [6.2, 8.5], [0, -32]].forEach(([tx, tz]) => {
      const tree = new THREE.Group();
      tree.position.set(tx, 0, tz);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.65, 5.2, 10), trunkMat);
      trunk.position.y = 2.6;
      trunk.castShadow = true;
      tree.add(trunk);

      const canopy = new THREE.Mesh(new THREE.DodecahedronGeometry(2.8, 1), leafMat);
      canopy.position.set(0, 5.6, 0);
      canopy.scale.set(1.4, 0.9, 1.4);
      canopy.castShadow = true;
      tree.add(canopy);

      scene.add(tree);
    });

    // Potted Chrysanthemums / Bonsai along the sidewalks (Image 5)
    const potGeo = new THREE.CylinderGeometry(0.24, 0.18, 0.38, 12);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x8D4A2F, roughness: 0.8 });
    const flowerMat = new THREE.MeshStandardMaterial({ color: 0xF3C623, roughness: 0.6 });

    [[-3.7, 5.0], [-3.7, 0], [-3.7, -2.5], [3.7, 5.0], [3.7, 0], [3.7, -2.5]].forEach(([px, pz]) => {
      const pot = new THREE.Mesh(potGeo, potMat);
      pot.position.set(px, 0.25, pz);
      scene.add(pot);

      const bush = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 8), flowerMat);
      bush.position.set(px, 0.52, pz);
      scene.add(bush);
    });
  }

  // Helper: Detailed Seated Artisan NPC Figure (Image 5 & Photo 2)
  function buildDetailedArtisanFigure() {
    const group = new THREE.Group();
    const tunicMat = new THREE.MeshStandardMaterial({ color: 0x1E272C, roughness: 0.8 }); // Dark indigo tunic
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xD4A373, roughness: 0.65 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0xEDEDED, roughness: 0.7 }); // Elderly white hair

    // Low wooden stool
    const stool = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 0.35, 12),
      new THREE.MeshStandardMaterial({ color: 0x3E2415, roughness: 0.8 })
    );
    stool.position.y = 0.18;
    group.add(stool);

    // Torso leaned slightly forward
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.65, 0.32), tunicMat);
    torso.position.set(0, 0.72, 0.08);
    torso.rotation.x = 0.2;
    group.add(torso);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 14), skinMat);
    head.position.set(0, 1.15, 0.18);
    group.add(head);

    // White hair
    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.19, 14, 14, 0, Math.PI * 2, 0, Math.PI / 2 + 0.2),
      hairMat
    );
    hair.position.set(0, 1.16, 0.18);
    group.add(hair);

    // Spectacles / Glasses
    const glassMat = new THREE.MeshBasicMaterial({ color: 0xD4AF37 });
    [-0.06, 0.06].forEach(gx => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.008, 8, 16), glassMat);
      ring.position.set(gx, 1.15, 0.35);
      group.add(ring);
    });

    // Arms bent over workbench
    const armGeo = new THREE.BoxGeometry(0.12, 0.42, 0.12);
    const armL = new THREE.Mesh(armGeo, tunicMat);
    armL.position.set(-0.28, 0.75, 0.25);
    armL.rotation.x = 0.75;
    group.add(armL);

    const armR = new THREE.Mesh(armGeo, tunicMat);
    armR.position.set(0.28, 0.75, 0.25);
    armR.rotation.x = 0.75;
    group.add(armR);

    return group;
  }

  // Helper: Painting Easel with Masterpiece (Image 5)
  function buildPaintingEasel(texture, w, h) {
    const easelGroup = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3E2415, roughness: 0.75 });

    // Legs
    [-w * 0.45, w * 0.45].forEach(lx => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, h + 0.6, 0.08), woodMat);
      leg.position.set(lx, (h + 0.6) / 2, 0);
      easelGroup.add(leg);
    });

    const crossBar = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.08, 0.12), woodMat);
    crossBar.position.set(0, 0.6, 0.06);
    easelGroup.add(crossBar);

    // Canvas Mesh
    const canvasMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ map: texture })
    );
    canvasMesh.position.set(0, 0.6 + h / 2, 0.08);
    easelGroup.add(canvasMesh);

    return easelGroup;
  }

  // Helper: Round Platter Display Stand (Photo 4 & Image 5)
  function buildPlateStand(texture, radius) {
    const standGroup = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3E2415, roughness: 0.75 });

    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 0.7, 12), woodMat);
    pedestal.position.y = 0.35;
    standGroup.add(pedestal);

    const plate = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 24),
      new THREE.MeshBasicMaterial({ map: texture })
    );
    plate.position.set(0, 0.7 + radius * 0.9, 0.05);
    plate.rotation.x = -0.15; // tilted slightly up towards viewer
    standGroup.add(plate);

    return standGroup;
  }

  // Helper: Floating Exclamation Interaction Beacon (!) (Image 5)
  function createExclamationMarker(colorHex = 0xD4AF37) {
    const markerGroup = new THREE.Group();

    // Golden circular disc
    const discGeo = new THREE.CircleGeometry(0.32, 24);
    const discMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    markerGroup.add(disc);

    // Exclamation Mark inside
    const bar = new THREE.Mesh(
      new THREE.PlaneGeometry(0.08, 0.32),
      new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    );
    bar.position.set(0, 0.05, 0.02);
    markerGroup.add(bar);

    const dot = new THREE.Mesh(
      new THREE.CircleGeometry(0.045, 12),
      new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    );
    dot.position.set(0, -0.18, 0.02);
    markerGroup.add(dot);

    return markerGroup;
  }

  // I. BUILD HOTSPOT BEACONS
  function buildHotspotBeacons(scene) {
    hotspotMeshesRef.current = [];

    VILLAGE_HOTSPOTS.forEach(spot => {
      const ringGeo = new THREE.RingGeometry(spot.radius * 0.85, spot.radius, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: spot.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(spot.position[0], 0.05, spot.position[2]);
      scene.add(ring);

      const beaconGeo = new THREE.CylinderGeometry(0.04, 0.6, 4.0, 16, 1, true);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: spot.color,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(spot.position[0], 2.0, spot.position[2]);
      scene.add(beacon);

      hotspotMeshesRef.current.push({ spot, ring, beacon });
    });
  }

  // J. BUILD VILLAGE NPC WANDERERS
  function buildVillageNPCs(scene) {
    npcsRef.current = [];
    const npcConfigs = [
      { x: -1.6, z: 2.0, color: 0xC59B27, minZ: -12, maxZ: 7, dir: -1, speed: 0.75 },
      { x: 1.6, z: -8.0, color: 0xB54636, minZ: -16, maxZ: 2, dir: 1, speed: 0.7 }
    ];

    npcConfigs.forEach((cfg) => {
      const npcGroup = new THREE.Group();
      npcGroup.position.set(cfg.x, 0, cfg.z);

      const bodyMat = new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.8 });
      const headMat = new THREE.MeshStandardMaterial({ color: 0xE5B28B, roughness: 0.6 });

      const torso = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.78, 0.28), bodyMat);
      torso.position.y = 0.98;
      npcGroup.add(torso);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), headMat);
      head.position.y = 1.52;
      npcGroup.add(head);

      const hat = new THREE.Mesh(
        new THREE.ConeGeometry(0.42, 0.18, 16),
        new THREE.MeshStandardMaterial({ color: 0xDAC7A1, roughness: 0.75 })
      );
      hat.position.y = 1.68;
      npcGroup.add(hat);

      scene.add(npcGroup);
      npcsRef.current.push({
        group: npcGroup,
        z: cfg.z,
        minZ: cfg.minZ,
        maxZ: cfg.maxZ,
        dir: cfg.dir,
        speed: cfg.speed
      });
    });
  }

  function updateVillageNPCs(delta) {
    npcsRef.current.forEach(npc => {
      npc.z += npc.dir * npc.speed * delta;
      if (npc.z > npc.maxZ) {
        npc.dir = -1;
        npc.group.rotation.y = 0;
      } else if (npc.z < npc.minZ) {
        npc.dir = 1;
        npc.group.rotation.y = Math.PI;
      }
      npc.group.position.z = npc.z;
    });
  }

  // =========================================================================
  // 3. BUILD 3D THIRD-PERSON PLAYER CHARACTER (GIRL EXPLORER - Image 5)
  // =========================================================================
  function buildPlayerCharacter() {
    const playerGroup = new THREE.Group();
    playerGroup.position.set(0, 0, 9.5);

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xE5B28B, roughness: 0.65 });
    const blouseMat = new THREE.MeshStandardMaterial({ color: 0xFAF6EE, roughness: 0.75 }); // Cream linen blouse
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x223547, roughness: 0.85 }); // Navy trousers
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x2A2A2A, roughness: 0.6 });
    const backpackMat = new THREE.MeshStandardMaterial({ color: 0x244F3B, roughness: 0.65 }); // Dark green canvas backpack
    const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xE8D8C3, roughness: 0.6 }); // Beige ribbon bow
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x22150E, roughness: 0.7 });

    // Torso (Cream Linen Blouse with loose sleeves)
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.85, 0.35), blouseMat);
    torso.position.y = 1.05;
    torso.castShadow = true;
    playerGroup.add(torso);

    // Dark Green Canvas Backpack with white lotus emblem (Image 5)
    const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.52, 0.22), backpackMat);
    backpack.position.set(0, 1.05, 0.26);
    playerGroup.add(backpack);

    const lotusDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.08, 16),
      new THREE.MeshBasicMaterial({ color: 0xFFFDF7 })
    );
    lotusDisc.position.set(0, 1.02, 0.375);
    playerGroup.add(lotusDisc);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), skinMat);
    head.position.y = 1.65;
    head.castShadow = true;
    playerGroup.add(head);

    // Dark Hair with Long Braid
    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2 + 0.3),
      hairMat
    );
    hair.position.set(0, 1.66, 0);
    playerGroup.add(hair);

    // Single Neat Braid hanging down back (Image 5)
    const braidGroup = new THREE.Group();
    for (let b = 0; b < 6; b++) {
      const braidSeg = new THREE.Mesh(
        new THREE.SphereGeometry(0.08 - b * 0.007, 8, 8),
        hairMat
      );
      braidSeg.position.set(0, 1.5 - b * 0.11, 0.22);
      braidGroup.add(braidSeg);
    }
    playerGroup.add(braidGroup);

    // Beige Ribbon Bow tied at back of hair (Image 5)
    const bow = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.06), ribbonMat);
    bow.position.set(0, 1.32, 0.25);
    playerGroup.add(bow);

    // Arms
    const armGeo = new THREE.BoxGeometry(0.14, 0.6, 0.14);
    const armL = new THREE.Mesh(armGeo, blouseMat);
    armL.position.set(-0.35, 1.05, 0);
    playerGroup.add(armL);

    const armR = new THREE.Mesh(armGeo, blouseMat);
    armR.position.set(0.35, 1.05, 0);
    playerGroup.add(armR);

    // Legs with Shoes
    const legGeo = new THREE.BoxGeometry(0.18, 0.65, 0.18);
    const legL = new THREE.Mesh(legGeo, pantsMat);
    legL.position.set(-0.16, 0.45, 0);
    legL.castShadow = true;
    playerGroup.add(legL);

    const legR = new THREE.Mesh(legGeo, pantsMat);
    legR.position.set(0.16, 0.45, 0);
    legR.castShadow = true;
    playerGroup.add(legR);

    const shoeGeo = new THREE.BoxGeometry(0.2, 0.12, 0.28);
    const shoeL = new THREE.Mesh(shoeGeo, shoeMat);
    shoeL.position.set(-0.16, 0.06, 0.04);
    playerGroup.add(shoeL);

    const shoeR = new THREE.Mesh(shoeGeo, shoeMat);
    shoeR.position.set(0.16, 0.06, 0.04);
    playerGroup.add(shoeR);

    playerPartsRef.current = { 
      leftLeg: legL, 
      rightLeg: legR, 
      leftArm: armL, 
      rightArm: armR,
      braid: braidGroup
    };
    return playerGroup;
  }

  // =========================================================================
  // 4. PLAYER MOVEMENT & TRUE THIRD-PERSON ORBIT FOLLOW CAMERA
  // =========================================================================
  function updatePlayerAndCamera(delta) {
    const pState = playerStateRef.current;
    const pMesh = playerMeshRef.current;
    const camCtrl = cameraControlRef.current;
    const camera = cameraRef.current;
    if (!pMesh || !camera) return;

    let inputX = 0;
    let inputZ = 0;

    const keys = keysPressedRef.current;
    if (keys['w'] || keys['arrowup']) inputZ -= 1;
    if (keys['s'] || keys['arrowdown']) inputZ += 1;
    if (keys['a'] || keys['arrowleft']) inputX -= 1;
    if (keys['d'] || keys['arrowright']) inputX += 1;

    // Merge Virtual Joystick input
    if (Math.abs(virtualMove.x) > 0.05) inputX += virtualMove.x;
    if (Math.abs(virtualMove.z) > 0.05) inputZ += virtualMove.z;

    const isSprinting = keys['shift'] || isVirtualSprinting;
    const baseSpeed = isSprinting ? 8.5 : 5.0;

    const inputLen = Math.hypot(inputX, inputZ);
    pState.isMoving = inputLen > 0.1;

    if (pState.isMoving) {
      const nx = inputX / inputLen;
      const nz = inputZ / inputLen;

      // Character moves relative to camera orientation!
      const forwardAngle = camCtrl.orbitYaw;
      const inputAngle = Math.atan2(nx, -nz);
      const moveAngle = inputAngle + forwardAngle;

      const vx = Math.sin(moveAngle) * baseSpeed;
      const vz = -Math.cos(moveAngle) * baseSpeed;

      const nextX = pState.x + vx * delta;
      const nextZ = pState.z + vz * delta;

      // COLLISION BOUNDARIES:
      // 1. Village Street corridor (x: [-3.8, 3.8], z: [-36, 14])
      // 2. Gate Opening (x: [-2.4, 2.4], z: [-6, -2])
      // 3. Workshop on Left (x: [-6.8, -3.8], z: [-1.2, 5.8])
      // 4. Crafting Pavilion & Gallery on Right (x: [3.8, 8.5], z: [-22, 5.8])
      let allowed = false;

      if (Math.abs(nextX) <= 3.8 && nextZ >= -36 && nextZ <= 14) {
        allowed = true;
      } else if (Math.abs(nextX) <= 2.4 && nextZ >= -6 && nextZ <= -2) {
        allowed = true;
      } else if (nextX >= -6.8 && nextX <= -3.6 && nextZ >= -1.5 && nextZ <= 6.0) {
        allowed = true;
      } else if (nextX >= 3.6 && nextX <= 8.5 && nextZ >= -22 && nextZ <= 6.0) {
        allowed = true;
      }

      if (allowed) {
        pState.x = nextX;
        pState.z = nextZ;
      }

      pState.targetYaw = moveAngle;

      // Walking cycle animation
      pState.walkTime += delta * (isSprinting ? 14 : 9);
      const walkCycle = Math.sin(pState.walkTime);
      const parts = playerPartsRef.current;
      if (parts.leftLeg && parts.rightLeg) {
        parts.leftLeg.rotation.x = walkCycle * 0.6;
        parts.rightLeg.rotation.x = -walkCycle * 0.6;
        parts.leftArm.rotation.x = -walkCycle * 0.5;
        parts.rightArm.rotation.x = walkCycle * 0.5;
      }
      pMesh.position.y = Math.abs(Math.sin(pState.walkTime * 2)) * 0.08;
    } else {
      const parts = playerPartsRef.current;
      if (parts.leftLeg && parts.rightLeg) {
        parts.leftLeg.rotation.x = 0;
        parts.rightLeg.rotation.x = 0;
        parts.leftArm.rotation.x = 0;
        parts.rightArm.rotation.x = 0;
      }
      // Idle breathing
      pMesh.position.y = Math.sin(performance.now() * 0.002) * 0.02;
    }

    // Smooth Yaw Turn
    let diff = pState.targetYaw - pState.yaw;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    pState.yaw += diff * 0.16;

    pMesh.position.x = pState.x;
    pMesh.position.z = pState.z;
    pMesh.rotation.y = pState.yaw;

    onPlayerPositionChange({ x: pState.x, z: pState.z });
    onPlayerRotationChange(pState.yaw);

    // TRUE THIRD-PERSON FOLLOW CAMERA RIG (ORBIT 360°)
    camCtrl.distance += (camCtrl.targetDistance - camCtrl.distance) * 0.1;
    const targetCamX = pState.x + camCtrl.distance * Math.sin(camCtrl.orbitYaw) * Math.cos(camCtrl.orbitPitch);
    const targetCamY = pState.y + 1.85 + camCtrl.distance * Math.sin(camCtrl.orbitPitch);
    const targetCamZ = pState.z + camCtrl.distance * Math.cos(camCtrl.orbitYaw) * Math.cos(camCtrl.orbitPitch);

    camera.position.x += (targetCamX - camera.position.x) * 0.12;
    camera.position.y += (targetCamY - camera.position.y) * 0.12;
    camera.position.z += (targetCamZ - camera.position.z) * 0.12;
    
    // Look ahead down the village street, keeping character in the lower-middle half (safely above the dialogue banner)
    camera.lookAt(pState.x, pState.y + 1.35, pState.z - 3.8);

    // Hotspot Proximity Check
    let closestSpot = null;
    let closestDist = Infinity;

    VILLAGE_HOTSPOTS.forEach(spot => {
      const dist = Math.hypot(pState.x - spot.position[0], pState.z - spot.position[2]);
      if (dist < spot.radius && dist < closestDist) {
        closestDist = dist;
        closestSpot = spot;
      }
    });

    onNearHotspot(closestSpot);

    hotspotMeshesRef.current.forEach(({ ring, beacon, spot }) => {
      ring.rotation.z += 0.015;
      const isNear = closestSpot && closestSpot.id === spot.id;
      ring.material.opacity = isNear ? 0.95 : 0.55;
      beacon.material.opacity = isNear ? 0.45 : 0.18;
    });
  }

  // Mouse Orbit Camera Drag
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    cameraControlRef.current.isDragging = true;
    cameraControlRef.current.lastMouseX = clientX;
    cameraControlRef.current.lastMouseY = clientY;
  };

  const handlePointerMove = (e) => {
    if (!cameraControlRef.current.isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - cameraControlRef.current.lastMouseX;
    const deltaY = clientY - cameraControlRef.current.lastMouseY;
    cameraControlRef.current.lastMouseX = clientX;
    cameraControlRef.current.lastMouseY = clientY;

    cameraControlRef.current.orbitYaw -= deltaX * 0.006;
    cameraControlRef.current.orbitPitch = Math.max(
      0.05,
      Math.min(0.9, cameraControlRef.current.orbitPitch + deltaY * 0.005)
    );
  };

  const handlePointerUp = () => {
    cameraControlRef.current.isDragging = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    cameraControlRef.current.targetDistance = Math.max(
      3.8,
      Math.min(10.0, cameraControlRef.current.targetDistance + e.deltaY * 0.005)
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none touch-none ${className}`}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onWheel={handleWheel}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
      
      {/* Floating Prompt When Near Interactive Hotspot */}
      {activeNearHotspot && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#17382D]/95 to-[#244F3B]/95 border-2 border-amber-300/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              ✦ Khám phá {activeNearHotspot.name} [Phím E]
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
