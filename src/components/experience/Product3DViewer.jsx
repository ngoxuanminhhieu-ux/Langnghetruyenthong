import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  createLidInlayCanvas, 
  createSideInlayCanvas, 
  createPauaMosaicTexture,
  createEggshellCrackleTexture,
  createBangleShellTexture,
  createPenBoxLidCanvas,
  COLOR_SWATCHES, 
  SIZES 
} from '../../utils/motherOfPearlTextures';
import { 
  RotateCcw, 
  RotateCw, 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  Camera, 
  Sparkles,
  Info
} from 'lucide-react';

export const Product3DViewer = ({
  productType = 'pen',
  motif = 'lotus',
  color = 'black',
  size = 'M',
  engravedText = '',
  showDimensions = false,
  isARMode = false,
  onExitAR = () => {},
  onCaptureSnapshot = () => {},
  onSelectColor = () => {},
  autoRotateDefault = false,
  backgroundScene = 'room', // 'room', 'dark', 'light'
  className = ''
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // Three.js instances refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const boxGroupRef = useRef(null);
  const dimensionGroupRef = useRef(null);
  const shadowMeshRef = useRef(null);
  const reqIdRef = useRef(null);

  // Textures refs for fast disposal & updates
  const lidTextureRef = useRef(null);
  const sideTextureRef = useRef(null);
  const frontTextureRef = useRef(null);

  // Materials refs
  const lidMaterialRef = useRef(null);
  const sideMaterialRef = useRef(null);
  const frontMaterialRef = useRef(null);
  const woodMaterialRef = useRef(null);
  const brassMaterialRef = useRef(null);

  // Interaction State
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotateDefault);
  const isAutoRotatingRef = useRef(autoRotateDefault);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const toggleAutoRotate = (val) => {
    const next = typeof val === 'boolean' ? val : !isAutoRotatingRef.current;
    isAutoRotatingRef.current = next;
    setIsAutoRotating(next);
  };

  // Rotation & zoom state
  const rotationRef = useRef({
    yaw: -0.45,       // horizontal angle (radians)
    pitch: 0.35,      // vertical angle (radians)
    targetYaw: -0.45,
    targetPitch: 0.35,
    distance: 5.6,
    targetDistance: 5.6
  });

  const pointerRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    touchDist: 0
  });

  // 1. Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.6);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // LIGHTING SETUP (Warm luxury heritage studio lighting)
    const ambientLight = new THREE.AmbientLight(0xFFF6EA, 1.2);
    scene.add(ambientLight);

    // Warm table lamp spotlight
    const keyLight = new THREE.SpotLight(0xFFE6C4, 3.2, 25, Math.PI / 4, 0.4, 1.2);
    keyLight.position.set(-3.5, 4.5, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Soft daylight fill light
    const fillLight = new THREE.DirectionalLight(0xE5F0FF, 1.5);
    fillLight.position.set(4.0, 3.0, 3.0);
    scene.add(fillLight);

    // Rim light to highlight mother-of-pearl iridescent edges
    const rimLight = new THREE.DirectionalLight(0xFFD6AA, 2.0);
    rimLight.position.set(0, 3.5, -4.0);
    scene.add(rimLight);

    // Underside warm bounce light
    const bounceLight = new THREE.DirectionalLight(0xCBB38B, 0.5);
    bounceLight.position.set(0, -3.0, 1.0);
    scene.add(bounceLight);

    // GROUND SHADOW PLANE
    const shadowGeo = new THREE.PlaneGeometry(12, 12);
    const shadowMat = new THREE.ShadowMaterial({
      opacity: 0.35
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.7;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    // Soft Radial Gradient Contact Shadow
    const contactCanvas = document.createElement('canvas');
    contactCanvas.width = 256;
    contactCanvas.height = 256;
    const cctx = contactCanvas.getContext('2d');
    const grad = cctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(15, 12, 10, 0.7)');
    grad.addColorStop(0.5, 'rgba(25, 20, 18, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    cctx.fillStyle = grad;
    cctx.fillRect(0, 0, 256, 256);

    const contactTexture = new THREE.CanvasTexture(contactCanvas);
    const contactMat = new THREE.MeshBasicMaterial({
      map: contactTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.8
    });
    const contactMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.6), contactMat);
    contactMesh.rotation.x = -Math.PI / 2;
    contactMesh.position.y = -0.69;
    scene.add(contactMesh);

    // 3D BOX MODEL CONTAINER GROUP
    const boxGroup = new THREE.Group();
    scene.add(boxGroup);
    boxGroupRef.current = boxGroup;

    // BUILD INITIAL PRODUCT 3D MODEL
    buildProductModel(boxGroup, productType);

    // DIMENSIONS OVERLAY GROUP
    const dimGroup = new THREE.Group();
    scene.add(dimGroup);
    dimensionGroupRef.current = dimGroup;
    buildDimensionGuides(dimGroup, size);

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // RENDER LOOP
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      // Auto rotation
      if (isAutoRotatingRef.current) {
        rotationRef.current.targetYaw += 0.007;
      }

      // Smooth damping interpolation (Lerp)
      const rot = rotationRef.current;
      rot.yaw += (rot.targetYaw - rot.yaw) * 0.1;
      rot.pitch += (rot.targetPitch - rot.pitch) * 0.1;
      rot.distance += (rot.targetDistance - rot.distance) * 0.1;

      // Clamp pitch to avoid flipping
      rot.pitch = Math.max(-0.25, Math.min(1.2, rot.pitch));

      // Calculate camera position from spherical coords
      const cam = cameraRef.current;
      if (cam) {
        cam.position.x = rot.distance * Math.sin(rot.yaw) * Math.cos(rot.pitch);
        cam.position.y = rot.distance * Math.sin(rot.pitch) + 0.3;
        cam.position.z = rot.distance * Math.cos(rot.yaw) * Math.cos(rot.pitch);
        cam.lookAt(0, 0.1, 0);
      }

      // Shimmer specular iridescent effect update
      if (lidMaterialRef.current && lidTextureRef.current) {
        // Micro-shift texture matrix for iridescent shimmer
        lidTextureRef.current.offset.set(
          Math.sin(rot.yaw * 1.5) * 0.003,
          Math.cos(rot.pitch * 1.5) * 0.003
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  // 2. Build Procedural 3D Model for Selected Authentic Product
  const buildProductModel = (group, curType = 'pen') => {
    // Clear existing children and geometries
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material && typeof obj.material.dispose === 'function') obj.material.dispose();
    }

    const curSwatch = COLOR_SWATCHES.find(c => c.id === color) || COLOR_SWATCHES[0];
    const baseColorHex = parseInt(curSwatch.hex.replace('#', '0x'), 16);

    // Luxury Wood & Lacquer material
    const woodMat = new THREE.MeshStandardMaterial({
      color: baseColorHex,
      roughness: 0.18,
      metalness: 0.12,
      envMapIntensity: 1.2
    });
    woodMaterialRef.current = woodMat;

    // 18K Brass / Gold hardware material
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xE8BA55,
      roughness: 0.22,
      metalness: 0.88,
      envMapIntensity: 1.5
    });
    brassMaterialRef.current = brassMat;

    // High-resolution authentic textures matching authentic Chuôn Ngọ pieces
    const pauaTex = new THREE.CanvasTexture(createPauaMosaicTexture(color));
    pauaTex.wrapS = THREE.RepeatWrapping;
    pauaTex.wrapT = THREE.RepeatWrapping;

    const eggshellTex = new THREE.CanvasTexture(createEggshellCrackleTexture(color));
    eggshellTex.wrapS = THREE.RepeatWrapping;
    eggshellTex.wrapT = THREE.ClampToEdgeWrapping;

    const bangleTex = new THREE.CanvasTexture(createBangleShellTexture());
    bangleTex.wrapS = THREE.RepeatWrapping;
    bangleTex.wrapT = THREE.ClampToEdgeWrapping;

    const penBoxLidTex = new THREE.CanvasTexture(createPenBoxLidCanvas(color, engravedText, motif));

    // High-polish Silver / Platinum material
    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xDEE4EA,
      roughness: 0.15,
      metalness: 0.92,
      envMapIntensity: 1.6
    });

    // Luxury Velvet material
    const velvetMat = new THREE.MeshStandardMaterial({
      color: 0x6E171E,
      roughness: 0.85,
      metalness: 0.05
    });

    // =========================================================================
    // PRODUCT TYPE 1: BÚT KÝ DOANH NHÂN KHẢM ỐC XÀ CỪ ('pen')
    // =========================================================================
    if (curType === 'pen') {
      const penAssembly = new THREE.Group();
      penAssembly.position.set(0, 0.1, 0);

      // 1. Luxury Open Black Lacquer Presentation Box Base
      const boxBaseGeo = new THREE.BoxGeometry(3.6, 0.28, 1.6);
      const boxBase = new THREE.Mesh(boxBaseGeo, woodMat);
      boxBase.position.set(0, -0.42, 0);
      boxBase.castShadow = true;
      boxBase.receiveShadow = true;
      penAssembly.add(boxBase);

      // Velvet interior cushion
      const velvetGeo = new THREE.BoxGeometry(3.3, 0.08, 1.3);
      const velvetMesh = new THREE.Mesh(velvetGeo, velvetMat);
      velvetMesh.position.set(0, -0.26, 0);
      penAssembly.add(velvetMesh);

      // Velvet pen bed contoured cradle groove
      const grooveGeo = new THREE.BoxGeometry(2.8, 0.03, 0.36);
      const grooveMat = new THREE.MeshStandardMaterial({ color: 0x480D13, roughness: 0.95 });
      const groove = new THREE.Mesh(grooveGeo, grooveMat);
      groove.position.set(0, -0.22, 0);
      penAssembly.add(groove);

      // 2. Open Angled Hinged Box Lid (Mở ngửa 68 độ khoe hoa sen khảm xà cừ & khắc tên)
      const lidHinge = new THREE.Group();
      lidHinge.position.set(0, -0.28, -0.8);
      lidHinge.rotation.x = -Math.PI * 0.38; // Tilted backwards ~68 degrees

      // Lid wood slab
      const lidSlabGeo = new THREE.BoxGeometry(3.6, 0.14, 1.6);
      const lidSlab = new THREE.Mesh(lidSlabGeo, woodMat);
      lidSlab.position.set(0, 0.07, 0.8);
      lidSlab.castShadow = true;
      lidHinge.add(lidSlab);

      // Underside Inlay Panel facing the viewer
      const lidInlayGeo = new THREE.PlaneGeometry(3.4, 1.45);
      const lidInlayMat = new THREE.MeshStandardMaterial({
        map: penBoxLidTex,
        roughness: 0.14,
        metalness: 0.2,
        envMapIntensity: 1.4
      });
      const lidInlay = new THREE.Mesh(lidInlayGeo, lidInlayMat);
      lidInlay.rotation.x = Math.PI / 2;
      lidInlay.position.set(0, -0.001, 0.8);
      lidHinge.add(lidInlay);

      // Two brass hinges along rear joint
      [-1.2, 1.2].forEach(hx => {
        const hingeMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.18, 16), brassMat);
        hingeMesh.rotation.z = Math.PI / 2;
        hingeMesh.position.set(hx, 0, 0);
        lidHinge.add(hingeMesh);
      });
      penAssembly.add(lidHinge);

      // 3. The Luxury Pen: Lying HORIZONTALLY nestled inside the velvet cradle
      const pen = new THREE.Group();
      pen.position.set(0, -0.16, 0);
      pen.rotation.z = Math.PI / 2; // Horizontal along X axis
      pen.rotation.x = 0.22;       // Clip faces forward/upward towards camera

      // Pen Barrel (Thân bút khảm ốc xà cừ ngũ sắc)
      const pauaMat = new THREE.MeshStandardMaterial({
        map: pauaTex,
        roughness: 0.12,
        metalness: 0.35,
        envMapIntensity: 1.6
      });
      const barrelGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.35, 32);
      const barrel = new THREE.Mesh(barrelGeo, pauaMat);
      barrel.position.y = -0.68;
      barrel.castShadow = true;
      pen.add(barrel);

      // Golden Bottom Finial (Chuôi bút mạ vàng)
      const tailGeo = new THREE.CylinderGeometry(0.12, 0.085, 0.14, 32);
      const tail = new THREE.Mesh(tailGeo, brassMat);
      tail.position.y = -1.42;
      pen.add(tail);
      const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), brassMat);
      tailTip.position.y = -1.49;
      pen.add(tailTip);

      // 18K Golden Center Band (Đai giữa thân bút)
      const bandGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.12, 32);
      const band = new THREE.Mesh(bandGeo, brassMat);
      band.position.y = 0.06;
      pen.add(band);

      const trim1 = new THREE.Mesh(new THREE.TorusGeometry(0.132, 0.012, 16, 32), brassMat);
      trim1.rotation.x = Math.PI / 2;
      trim1.position.y = 0.11;
      pen.add(trim1);

      const trim2 = trim1.clone();
      trim2.position.y = 0.01;
      pen.add(trim2);

      // Pen Cap (Nắp bút nạm ốc xà cừ ngũ sắc toàn phần)
      const capGeo = new THREE.CylinderGeometry(0.13, 0.13, 1.15, 32);
      const cap = new THREE.Mesh(capGeo, pauaMat);
      cap.position.y = 0.70;
      cap.castShadow = true;
      pen.add(cap);

      // Golden Clip (Kẹp cài áo mạ vàng 18K)
      const clipCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.09, 32), brassMat);
      clipCollar.position.y = 1.20;
      pen.add(clipCollar);

      const clipArm = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.85, 0.04), brassMat);
      clipArm.position.set(0, 0.78, 0.16);
      pen.add(clipArm);

      const clipBall = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), brassMat);
      clipBall.position.set(0, 0.36, 0.165);
      pen.add(clipBall);

      // Golden Crown Finial (Đỉnh nắp)
      const crownGeo = new THREE.CylinderGeometry(0.105, 0.13, 0.12, 32);
      const crown = new THREE.Mesh(crownGeo, brassMat);
      crown.position.y = 1.34;
      pen.add(crown);

      const gemMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 24), woodMat);
      gemMesh.position.y = 1.41;
      pen.add(gemMesh);

      penAssembly.add(pen);
      group.add(penAssembly);
      return;
    }

    // =========================================================================
    // PRODUCT TYPE 2: BÁT SƠN MÀI CẨN VỎ TRỨNG & XÀ CỪ ('bowl')
    // =========================================================================
    // =========================================================================
    // PRODUCT TYPE 2: BÁT SƠN MÀI CẨN VỎ TRỨNG & KHẢM XÀ CỪ ('bowl')
    // =========================================================================
    if (curType === 'bowl') {
      const bowlGroup = new THREE.Group();
      bowlGroup.position.set(0, 0.05, 0);
      bowlGroup.rotation.x = -0.14; // Tilted slightly backwards so outer wall faces camera
      bowlGroup.rotation.y = -0.18;

      // Wrap crackle texture 2.5x around circumference for fine micro-crackle
      eggshellTex.repeat.set(2.5, 1);
      eggshellTex.wrapS = THREE.RepeatWrapping;

      // Authentic Vietnamese Lacquer Tea Bowl Lathe Profile (Chuôn Ngọ Cẩn Trứng)
      const pts = [
        new THREE.Vector2(0, -0.40),
        new THREE.Vector2(0.32, -0.40),
        new THREE.Vector2(0.40, -0.43),
        new THREE.Vector2(0.42, -0.56), // foot ring base
        new THREE.Vector2(0.47, -0.56),
        new THREE.Vector2(0.47, -0.40), // foot ring outer
        new THREE.Vector2(0.58, -0.18), // rounded belly swell
        new THREE.Vector2(0.78, 0.08),
        new THREE.Vector2(0.96, 0.32),
        new THREE.Vector2(1.08, 0.50),  // flared rim
        new THREE.Vector2(1.10, 0.53),  // rim apex
        new THREE.Vector2(1.06, 0.54),
        new THREE.Vector2(1.02, 0.51),
        new THREE.Vector2(0.88, 0.30),  // interior curve
        new THREE.Vector2(0.68, 0.08),
        new THREE.Vector2(0.45, -0.16),
        new THREE.Vector2(0.24, -0.32),
        new THREE.Vector2(0, -0.34)
      ];

      const bowlGeo = new THREE.LatheGeometry(pts, 64);
      const bowlMat = new THREE.MeshStandardMaterial({
        map: eggshellTex,
        roughness: 0.14,
        metalness: 0.12,
        envMapIntensity: 1.6
      });
      const bowlMesh = new THREE.Mesh(bowlGeo, bowlMat);
      bowlMesh.castShadow = true;
      bowlMesh.receiveShadow = true;
      bowlGroup.add(bowlMesh);

      // Luxurious Crimson Silk Fabric Runner (Khăn lụa gấm đỏ thắm)
      const silkGeo = new THREE.BoxGeometry(3.5, 0.03, 2.5);
      const silkMat = new THREE.MeshStandardMaterial({ color: 0x82121D, roughness: 0.78 });
      const silk = new THREE.Mesh(silkGeo, silkMat);
      silk.position.y = -0.57;
      silk.receiveShadow = true;
      bowlGroup.add(silk);

      // Gold silk border
      const silkBorder = new THREE.Mesh(new THREE.BoxGeometry(3.54, 0.032, 2.54), brassMat);
      silkBorder.position.y = -0.575;
      bowlGroup.add(silkBorder);

      // Companion Eggshell Tea Bowl (resting beside on silk runner, matching artisan photo)
      const compPts = pts.map(p => new THREE.Vector2(p.x * 0.72, p.y * 0.72));
      const compGeo = new THREE.LatheGeometry(compPts, 48);
      const compMesh = new THREE.Mesh(compGeo, bowlMat);
      compMesh.position.set(1.30, -0.16, -0.35);
      compMesh.rotation.y = 0.8;
      compMesh.castShadow = true;
      bowlGroup.add(compMesh);

      group.add(bowlGroup);
      return;
    }

    // =========================================================================
    // PRODUCT TYPE 3: VÒNG TAY BẢN LIỀN KHẢM XÀ CỪ ('bangle')
    // =========================================================================
    if (curType === 'bangle') {
      const bangleGroup = new THREE.Group();
      bangleGroup.position.set(0, 0.06, 0);

      // Presentation dark lacquer coaster & velvet cushion
      const coasterGeo = new THREE.BoxGeometry(3.6, 0.10, 2.4);
      const coasterMesh = new THREE.Mesh(coasterGeo, woodMat);
      coasterMesh.position.set(0, -0.45, 0);
      coasterMesh.receiveShadow = true;
      bangleGroup.add(coasterMesh);

      const velvetMatCushion = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.02, 2.1), velvetMat);
      velvetMatCushion.position.set(0, -0.39, 0);
      bangleGroup.add(velvetMatCushion);

      // Main Bangle Assembly (resting gracefully on velvet tray, Image 2 boutique style)
      const mainBangle = new THREE.Group();
      mainBangle.position.set(-0.35, -0.18, 0.10);
      mainBangle.rotation.x = 0.22;
      mainBangle.rotation.y = -0.15;
      mainBangle.rotation.z = 0.08;

      // Realistic cuff proportions: Outer radius 0.88, inner radius 0.79, height 0.30
      const outerR = 0.88;
      const innerR = 0.79;
      const cuffH = 0.30;

      // Outer cylinder (Segmented Mother-of-pearl tiles with growth lines)
      const shellGeo = new THREE.CylinderGeometry(outerR, outerR, cuffH, 64, 1, true);
      const shellMat = new THREE.MeshStandardMaterial({
        map: bangleTex,
        roughness: 0.12,
        metalness: 0.18,
        envMapIntensity: 1.5,
        side: THREE.DoubleSide
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      shellMesh.castShadow = true;
      mainBangle.add(shellMesh);

      // Inner metallic wall (Silvery titanium/silver core)
      const innerGeo = new THREE.CylinderGeometry(innerR, innerR, cuffH, 64, 1, true);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0xDCE2E8,
        metalness: 0.92,
        roughness: 0.16,
        side: THREE.BackSide
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      mainBangle.add(innerMesh);

      // Twin Silver Retaining Rims on Top and Bottom (flush with outer shell)
      const rimGeo = new THREE.TorusGeometry((outerR + innerR) / 2, (outerR - innerR) / 2, 16, 64);
      const rimTop = new THREE.Mesh(rimGeo, silverMat);
      rimTop.rotation.x = Math.PI / 2;
      rimTop.position.y = cuffH / 2;
      mainBangle.add(rimTop);

      const rimBottom = new THREE.Mesh(rimGeo, silverMat);
      rimBottom.rotation.x = Math.PI / 2;
      rimBottom.position.y = -cuffH / 2;
      mainBangle.add(rimBottom);

      bangleGroup.add(mainBangle);

      // Second Companion Bangle resting flat nearby on velvet tray (Image 2 style)
      const compBangle = new THREE.Group();
      compBangle.position.set(0.68, -0.28, -0.22);
      compBangle.rotation.x = 0.10;
      compBangle.rotation.y = 0.45;

      const compShell = new THREE.Mesh(shellGeo, shellMat);
      compShell.castShadow = true;
      compBangle.add(compShell);

      const compInner = new THREE.Mesh(innerGeo, innerMat);
      compBangle.add(compInner);

      const compRimTop = new THREE.Mesh(rimGeo, silverMat);
      compRimTop.rotation.x = Math.PI / 2;
      compRimTop.position.y = cuffH / 2;
      compBangle.add(compRimTop);

      const compRimBot = new THREE.Mesh(rimGeo, silverMat);
      compRimBot.rotation.x = Math.PI / 2;
      compRimBot.position.y = -cuffH / 2;
      compBangle.add(compRimBot);

      bangleGroup.add(compBangle);

      group.add(bangleGroup);
      return;
    }

    // =========================================================================
    // PRODUCT TYPE 4: CHUỖI VÒNG TAY HẠT XÀ CỪ ('beads')
    // =========================================================================
    if (curType === 'beads') {
      const beadsGroup = new THREE.Group();
      beadsGroup.position.set(0, -0.18, 0);
      beadsGroup.rotation.x = 0.45;

      const beadCount = 20;
      const beadRadius = 0.88;
      const beadGeo = new THREE.SphereGeometry(0.09, 32, 32);
      const beadMat = new THREE.MeshStandardMaterial({
        color: 0xFDFBF7,
        roughness: 0.12,
        metalness: 0.28,
        envMapIntensity: 1.8
      });

      for (let i = 0; i < beadCount; i++) {
        const angle = (i / beadCount) * Math.PI * 2;
        const bead = new THREE.Mesh(beadGeo, beadMat);
        bead.position.set(Math.cos(angle) * beadRadius, 0, Math.sin(angle) * beadRadius);
        bead.castShadow = true;
        beadsGroup.add(bead);
      }

      // Centerpiece Guru Medallion Charm (Khóa hoa sen xà cừ)
      const charmMedallion = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 32), beadMat);
      charmMedallion.position.set(0, 0, beadRadius);
      charmMedallion.rotation.x = Math.PI / 2;
      beadsGroup.add(charmMedallion);

      // Display Box Frame (Khung màng phim mica viền trắng)
      const boxFrameGeo = new THREE.BoxGeometry(2.4, 0.12, 2.4);
      const boxMat = new THREE.MeshStandardMaterial({ color: 0xFFFDF7, roughness: 0.25 });
      const boxFrame = new THREE.Mesh(boxFrameGeo, boxMat);
      boxFrame.position.y = -0.22;
      boxFrame.receiveShadow = true;
      beadsGroup.add(boxFrame);

      group.add(beadsGroup);
      return;
    }

    // =========================================================================
    // PRODUCT TYPE 5: BỘ CHARM KHUYÊN TAI & MẶT DÂY CHUYỀN XÀ CỪ ('charms')
    // =========================================================================
    if (curType === 'charms') {
      const charmGroup = new THREE.Group();
      charmGroup.position.set(0, -0.15, 0);

      const charmMat = new THREE.MeshStandardMaterial({
        map: bangleTex,
        roughness: 0.12,
        metalness: 0.25,
        envMapIntensity: 1.5
      });

      // 1. Donut Bi-Disc Pendant (Bạch ngọc bội xà cừ tròn rỗng tâm)
      const donutGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.04, 32);
      const donutMesh = new THREE.Mesh(donutGeo, charmMat);
      donutMesh.rotation.x = Math.PI / 2;
      donutMesh.position.set(-0.65, 0.06, 0);
      donutMesh.castShadow = true;
      charmGroup.add(donutMesh);

      // Donut inner hole cutout simulation
      const donutHole = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 32), woodMat);
      donutHole.rotation.x = Math.PI / 2;
      donutHole.position.set(-0.65, 0.06, 0);
      charmGroup.add(donutHole);

      // 2. Plum Blossom 5-petal carved shell charm (Hoa mai xà cừ)
      const flowerGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.035, 5);
      const centerFlower = new THREE.Mesh(flowerGeo, charmMat);
      centerFlower.rotation.x = Math.PI / 2;
      centerFlower.position.set(0.60, 0.06, 0);
      centerFlower.castShadow = true;
      charmGroup.add(centerFlower);

      // 3. Center Teardrop / Pear-shaped pendant
      const dropGeo = new THREE.ConeGeometry(0.22, 0.58, 24);
      const centerDrop = new THREE.Mesh(dropGeo, charmMat);
      centerDrop.rotation.z = Math.PI;
      centerDrop.position.set(0, 0.10, 0);
      centerDrop.castShadow = true;
      charmGroup.add(centerDrop);

      // Silver loop hooks
      [-0.65, 0, 0.60].forEach(hx => {
        const hook = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.012, 12, 24), silverMat);
        hook.position.set(hx, 0.45, 0);
        charmGroup.add(hook);
      });

      // Wooden bamboo presentation dish
      const dishGeo = new THREE.CylinderGeometry(1.6, 1.3, 0.12, 36);
      const dish = new THREE.Mesh(dishGeo, woodMat);
      dish.position.y = -0.45;
      dish.receiveShadow = true;
      charmGroup.add(dish);

      group.add(charmGroup);
      return;
    }

    // =========================================================================
    // PRODUCT TYPE 6: DÂY CHUYỀN MẶT XÀ CỪ TRÒN TỰ NHIÊN ('necklace')
    // =========================================================================
    if (curType === 'necklace') {
      const necklaceGroup = new THREE.Group();
      necklaceGroup.position.set(0, -0.15, 0);
      necklaceGroup.rotation.x = 0.25;

      // 1. Natural Iridescent Mother-of-Pearl Circular Disc Pendant
      const discMat = new THREE.MeshStandardMaterial({
        map: bangleTex,
        color: 0xFFFDF7,
        roughness: 0.12,
        metalness: 0.28,
        envMapIntensity: 1.8
      });
      const discGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.055, 64);
      const discMesh = new THREE.Mesh(discGeo, discMat);
      discMesh.rotation.x = Math.PI / 2;
      discMesh.position.set(0, -0.10, 0);
      discMesh.castShadow = true;
      necklaceGroup.add(discMesh);

      // Top drill hole for bail
      const holeMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.065, 24), woodMat);
      holeMesh.rotation.x = Math.PI / 2;
      holeMesh.position.set(0, 0.46, 0);
      necklaceGroup.add(holeMesh);

      // 2. Ebony / Horn Loop Bail (Chốt móc gỗ mun / sừng đen bóng)
      const bailMat = new THREE.MeshStandardMaterial({
        color: 0x1A1816,
        roughness: 0.2,
        metalness: 0.15
      });
      const bailGeo = new THREE.TorusGeometry(0.18, 0.055, 16, 32);
      const bailMesh = new THREE.Mesh(bailGeo, bailMat);
      bailMesh.position.set(0, 0.54, 0.02);
      necklaceGroup.add(bailMesh);

      // 3. Multi-strand Black Waxed Cords (Dây dù sáp đen)
      const cordMat = new THREE.MeshStandardMaterial({
        color: 0x151515,
        roughness: 0.7,
        metalness: 0.05
      });

      const leftCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.68, 0.02),
        new THREE.Vector3(-0.35, 1.05, 0.05),
        new THREE.Vector3(-0.55, 1.45, -0.05),
        new THREE.Vector3(-0.20, 1.75, -0.1),
        new THREE.Vector3(0, 1.85, -0.1)
      ]);
      const leftCord = new THREE.Mesh(new THREE.TubeGeometry(leftCurve, 40, 0.022, 12, false), cordMat);
      necklaceGroup.add(leftCord);

      const rightCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.68, 0.02),
        new THREE.Vector3(0.35, 1.05, 0.05),
        new THREE.Vector3(0.55, 1.45, -0.05),
        new THREE.Vector3(0.20, 1.75, -0.1),
        new THREE.Vector3(0, 1.85, -0.1)
      ]);
      const rightCord = new THREE.Mesh(new THREE.TubeGeometry(rightCurve, 40, 0.022, 12, false), cordMat);
      necklaceGroup.add(rightCord);

      // Decorative crimson & gold thread wrap bindings
      const wrapMat = new THREE.MeshStandardMaterial({ color: 0x8B1E24, roughness: 0.5 });
      const goldWrapMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, roughness: 0.3, metalness: 0.8 });
      [0.95, 1.35].forEach(wy => {
        const wrapL = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.09, 16), wrapMat);
        wrapL.position.set(-0.35 * (wy / 1.2), wy, 0);
        necklaceGroup.add(wrapL);
        const ringL = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.01, 12, 24), goldWrapMat);
        ringL.position.set(-0.35 * (wy / 1.2), wy + 0.05, 0);
        necklaceGroup.add(ringL);

        const wrapR = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.09, 16), wrapMat);
        wrapR.position.set(0.35 * (wy / 1.2), wy, 0);
        necklaceGroup.add(wrapR);
        const ringR = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.01, 12, 24), goldWrapMat);
        ringR.position.set(0.35 * (wy / 1.2), wy + 0.05, 0);
        necklaceGroup.add(ringR);
      });

      // 4. Toggle Clasp (Hạt ngọc xà cừ khóa dây)
      const claspMesh = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 16, 32), discMat);
      claspMesh.position.set(0, 1.85, -0.1);
      necklaceGroup.add(claspMesh);

      // Velvet display base
      const trayGeo = new THREE.BoxGeometry(2.6, 0.12, 2.8);
      const tray = new THREE.Mesh(trayGeo, velvetMat);
      tray.position.set(0, -0.45, 0.4);
      tray.receiveShadow = true;
      necklaceGroup.add(tray);

      group.add(necklaceGroup);
      return;
    }

    // =========================================================================
    // DEFAULT: HỘP TRANG SỨC SƠN MÀI KHẢM TRAI CỔ ĐIỂN ('box')
    // =========================================================================
    const length = 2.4;
    const width = 1.6;
    const bodyHeight = 0.65;
    const lidHeight = 0.28;

    const bodyGeo = new THREE.BoxGeometry(length, bodyHeight, width);
    const bodyMesh = new THREE.Mesh(bodyGeo, woodMat);
    bodyMesh.position.y = bodyHeight / 2 - 0.45;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    group.add(bodyMesh);

    // 4 bracket feet
    const footGeo = new THREE.BoxGeometry(0.24, 0.14, 0.24);
    const footPositions = [
      [-length / 2 + 0.18, -0.45 - 0.07, -width / 2 + 0.18],
      [length / 2 - 0.18, -0.45 - 0.07, -width / 2 + 0.18],
      [-length / 2 + 0.18, -0.45 - 0.07, width / 2 - 0.18],
      [length / 2 - 0.18, -0.45 - 0.07, width / 2 - 0.18],
    ];
    footPositions.forEach(pos => {
      const foot = new THREE.Mesh(footGeo, woodMat);
      foot.position.set(...pos);
      foot.castShadow = true;
      group.add(foot);
    });

    // Lid
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, bodyHeight - 0.45 + lidHeight / 2, 0);
    const lidGeo = new THREE.BoxGeometry(length + 0.08, lidHeight, width + 0.08);
    const lidMesh = new THREE.Mesh(lidGeo, woodMat);
    lidMesh.castShadow = true;
    lidMesh.receiveShadow = true;
    lidGroup.add(lidMesh);

    // Top Inlay Canvas
    const lidCanvas = createLidInlayCanvas(motif, color, engravedText);
    const lidTex = new THREE.CanvasTexture(lidCanvas);
    const lidMat = new THREE.MeshStandardMaterial({
      map: lidTex,
      roughness: 0.14,
      metalness: 0.18,
      envMapIntensity: 1.4
    });
    const topInlayGeo = new THREE.PlaneGeometry(length + 0.06, width + 0.06);
    const topInlayMesh = new THREE.Mesh(topInlayGeo, lidMat);
    topInlayMesh.rotation.x = -Math.PI / 2;
    topInlayMesh.position.y = lidHeight / 2 + 0.002;
    lidGroup.add(topInlayMesh);
    group.add(lidGroup);

    // Brass latch
    const claspPlate = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.24, 0.03), brassMat);
    claspPlate.position.set(0, bodyHeight - 0.45, width / 2 + 0.025);
    group.add(claspPlate);

    applySizeScale(group, size);
  };

  // 3. Build Dimension Guides Lines (Kích thước 3D)
  const buildDimensionGuides = (group, curSize) => {
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    }

    if (!showDimensions) return;

    const sizeObj = SIZES.find(s => s.id === curSize) || SIZES[1];
    const s = sizeObj.scale;
    const l = 2.4 * s[0];
    const w = 1.6 * s[2];
    const h = 0.93 * s[1];

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x2A6B4F,
      linewidth: 2,
      depthTest: false,
      transparent: true,
      opacity: 0.95
    });

    const createDashedLine = (p1, p2) => {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const line = new THREE.Line(geo, lineMat);
      line.renderOrder = 999;
      return line;
    };

    // Length dimension line (front bottom)
    const lenY = -0.65;
    const lenZ = w / 2 + 0.35;
    group.add(createDashedLine(new THREE.Vector3(-l / 2, lenY, lenZ), new THREE.Vector3(l / 2, lenY, lenZ)));
    group.add(createDashedLine(new THREE.Vector3(-l / 2, lenY - 0.08, lenZ), new THREE.Vector3(-l / 2, lenY + 0.08, lenZ)));
    group.add(createDashedLine(new THREE.Vector3(l / 2, lenY - 0.08, lenZ), new THREE.Vector3(l / 2, lenY + 0.08, lenZ)));

    // Width dimension line (right side bottom)
    const widX = l / 2 + 0.35;
    const widY = -0.65;
    group.add(createDashedLine(new THREE.Vector3(widX, widY, -w / 2), new THREE.Vector3(widX, widY, w / 2)));
    group.add(createDashedLine(new THREE.Vector3(widX, widY - 0.08, -w / 2), new THREE.Vector3(widX, widY + 0.08, -w / 2)));
    group.add(createDashedLine(new THREE.Vector3(widX, widY - 0.08, w / 2), new THREE.Vector3(widX, widY + 0.08, w / 2)));

    // Height dimension line (left front corner)
    const heiX = -l / 2 - 0.35;
    const heiZ = w / 2;
    group.add(createDashedLine(new THREE.Vector3(heiX, -0.5, heiZ), new THREE.Vector3(heiX, -0.5 + h, heiZ)));
    group.add(createDashedLine(new THREE.Vector3(heiX - 0.08, -0.5, heiZ), new THREE.Vector3(heiX + 0.08, -0.5, heiZ)));
    group.add(createDashedLine(new THREE.Vector3(heiX - 0.08, -0.5 + h, heiZ), new THREE.Vector3(heiX + 0.08, -0.5 + h, heiZ)));
  };

  // 4. Apply scale when size changes
  const applySizeScale = (group, curSize) => {
    const sizeObj = SIZES.find(s => s.id === curSize) || SIZES[1];
    group.scale.set(...sizeObj.scale);
  };

  // 5. Update 3D model & textures dynamically on prop changes
  useEffect(() => {
    if (!boxGroupRef.current) return;

    // Rebuild model for active product type
    buildProductModel(boxGroupRef.current, productType);

    // Update Top Lid Inlay texture
    const lidCanvas = createLidInlayCanvas(motif, color, engravedText);
    if (lidTextureRef.current) {
      lidTextureRef.current.image = lidCanvas;
      lidTextureRef.current.needsUpdate = true;
    }

    // Update Front and Side Inlay textures
    const frontCanvas = createSideInlayCanvas(color, 512, 180, true);
    if (frontTextureRef.current) {
      frontTextureRef.current.image = frontCanvas;
      frontTextureRef.current.needsUpdate = true;
    }

    const sideCanvas = createSideInlayCanvas(color, 360, 180, false);
    if (sideTextureRef.current) {
      sideTextureRef.current.image = sideCanvas;
      sideTextureRef.current.needsUpdate = true;
    }

    // Update Wood Color
    const curSwatch = COLOR_SWATCHES.find(c => c.id === color) || COLOR_SWATCHES[0];
    const baseColorHex = parseInt(curSwatch.hex.replace('#', '0x'), 16);
    if (woodMaterialRef.current) {
      woodMaterialRef.current.color.setHex(baseColorHex);
    }

    // Update Scale
    applySizeScale(boxGroupRef.current, size);

    // Update Dimension Guides
    if (dimensionGroupRef.current) {
      buildDimensionGuides(dimensionGroupRef.current, size);
    }
  }, [productType, motif, color, size, engravedText, showDimensions]);

  // 6. Camera WebAR Mode Handler
  useEffect(() => {
    if (!isARMode) {
      // Stop camera stream if active
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraReady(false);
      setCameraError(null);
      return;
    }

    // Request device camera stream
    let activeStream = null;
    const startCamera = async () => {
      try {
        setCameraError(null);
        const constraints = {
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        activeStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraReady(true);
        }
      } catch (err) {
        console.warn('WebAR Camera access error:', err);
        setCameraError('Không thể mở camera thiết bị hoặc quyền truy cập bị từ chối.');
        setIsCameraReady(false);
      }
    };

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isARMode]);

  // 7. Mouse / Touch Orbit Controls Handlers
  const handlePointerDown = (e) => {
    toggleAutoRotate(false);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    pointerRef.current = {
      isDown: true,
      startX: clientX,
      startY: clientY,
      lastX: clientX,
      lastY: clientY,
      touchDist: e.touches && e.touches.length === 2
        ? Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
        : 0
    };
  };

  const handlePointerMove = (e) => {
    if (!pointerRef.current.isDown) return;

    // Two finger pinch to zoom
    if (e.touches && e.touches.length === 2) {
      const curDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (pointerRef.current.touchDist > 0) {
        const factor = (curDist - pointerRef.current.touchDist) * 0.008;
        rotationRef.current.targetDistance = Math.max(3.4, Math.min(8.5, rotationRef.current.targetDistance - factor));
      }
      pointerRef.current.touchDist = curDist;
      return;
    }

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - pointerRef.current.lastX;
    const deltaY = clientY - pointerRef.current.lastY;

    pointerRef.current.lastX = clientX;
    pointerRef.current.lastY = clientY;

    // Rotate model
    rotationRef.current.targetYaw += deltaX * 0.008;
    rotationRef.current.targetPitch += deltaY * 0.008;
  };

  const handlePointerUp = () => {
    pointerRef.current.isDown = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.003;
    rotationRef.current.targetDistance = Math.max(
      3.4,
      Math.min(8.5, rotationRef.current.targetDistance + zoomDelta)
    );
  };

  // Nudge Left / Right by 45 degrees
  const rotateStep = (direction = 1) => {
    toggleAutoRotate(false);
    rotationRef.current.targetYaw += direction * (Math.PI / 4);
  };

  // Snapshot Capture
  const takeSnapshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    onCaptureSnapshot(dataUrl);

    // Also trigger instant download
    const link = document.createElement('a');
    link.download = `ChuonNgo_${motif}_${color}_360.png`;
    link.href = dataUrl;
    link.click();
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Listen for global snapshot trigger from left toolbar
  useEffect(() => {
    const handleTriggerSnapshot = () => {
      takeSnapshot();
    };
    window.addEventListener('trigger-product-snapshot', handleTriggerSnapshot);
    return () => window.removeEventListener('trigger-product-snapshot', handleTriggerSnapshot);
  }, [motif, color]);

  const activeSize = SIZES.find(s => s.id === size) || SIZES[1];

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full min-h-[460px] sm:min-h-[520px] rounded-2xl overflow-hidden select-none touch-none ${className}`}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* 1. BACKGROUND SCENE: Real Camera feed (if AR mode) OR Studio Tabletop scene (if 3D mode) */}
      {isARMode ? (
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="/images/ar_studio_background.jpg"
            alt="Studio Display Tabletop"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Subtle soft gradient overlay to enhance 3D box contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>
      )}

      {/* 2. AR CAMERA NOTICE OR ERROR */}
      {isARMode && cameraError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="max-w-md bg-[#17382D] border border-[#B69A68] rounded-2xl p-6 text-center text-[#FFFDF7] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#B69A68]/20 border border-[#B69A68] flex items-center justify-center mx-auto text-[#D8C29D]">
              <Info className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold">Quyền Truy Cập Camera</h4>
            <p className="text-xs text-[#F5F0E5]/80 leading-relaxed">
              {cameraError}
              <br />
              Vui lòng cho phép quyền truy cập camera trên trình duyệt di động để đặt tác phẩm vào không gian thực của bạn.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={onExitAR}
                className="px-5 py-2 rounded-full bg-[#B69A68] text-[#17382D] text-xs font-bold shadow-md hover:bg-[#D4BA88]"
              >
                Quay lại Chế độ 3D Studio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. AR LIVE HUD OVERLAY */}
      {isARMode && isCameraReady && (
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
          <div className="bg-[#17382D]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#B69A68]/50 text-xs text-[#FFFDF7] flex items-center gap-2 pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">WebAR Camera Trực Tiếp</span>
          </div>

          <button
            onClick={onExitAR}
            className="pointer-events-auto px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-colors shadow-lg"
          >
            Thoát AR ✕
          </button>
        </div>
      )}

      {/* 4. THREE.JS WEBGL CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10"
      />

      {/* 5. FOUR FOCUS CORNER BRACKETS (⌜ ⌝ ⌞ ⌟ matching reference image) */}
      <div className="absolute inset-x-8 inset-y-12 sm:inset-x-16 sm:inset-y-16 pointer-events-none z-20 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-8 h-8 sm:w-11 sm:h-11 border-t-2 border-l-2 border-white/70 rounded-tl-xl shadow-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
          <div className="w-8 h-8 sm:w-11 sm:h-11 border-t-2 border-r-2 border-white/70 rounded-tr-xl shadow-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
        </div>
        <div className="flex justify-between items-end">
          <div className="w-8 h-8 sm:w-11 sm:h-11 border-b-2 border-l-2 border-white/70 rounded-bl-xl shadow-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
          <div className="w-8 h-8 sm:w-11 sm:h-11 border-b-2 border-r-2 border-white/70 rounded-br-xl shadow-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
        </div>
      </div>

      {/* 6. GLOWING 360° ORBIT RING (Centered under product matching reference image) */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <div className="relative w-72 sm:w-96 h-20 flex items-center justify-center">
          {/* Glowing Ellipse Ring SVG */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 380 90">
            {/* Soft Outer Glow */}
            <ellipse
              cx="190"
              cy="45"
              rx="170"
              ry="36"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
            {/* Main Crisp Ring */}
            <ellipse
              cx="190"
              cy="45"
              rx="170"
              ry="36"
              fill="none"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.5"
            />
            {/* Left Rotation Arrow */}
            <path
              d="M 32 45 L 20 40 M 32 45 L 24 56"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Rotation Arrow */}
            <path
              d="M 348 45 L 360 40 M 348 45 L 356 56"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Central 360° Pill Badge */}
          <div className="relative z-30 bg-black/40 backdrop-blur-md border border-white/50 text-white px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wider flex items-center gap-1 shadow-md">
            <span>360°</span>
          </div>
        </div>
      </div>

      {/* 7. LEFT & RIGHT ROTATE BUTTONS */}
      <button
        onClick={() => rotateStep(-1)}
        title="Xoay sang trái 45°"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white text-[#17382D] backdrop-blur-md shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      <button
        onClick={() => rotateStep(1)}
        title="Xoay sang phải 45°"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white text-[#17382D] backdrop-blur-md shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        <RotateCw className="w-4 h-4" />
      </button>

      {/* 8. TOP-RIGHT VIEWER TOOLS (Auto-rotate toggle & Fullscreen) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => toggleAutoRotate()}
          title={isAutoRotating ? 'Tạm dừng tự động xoay' : 'Tự động xoay 360°'}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border flex items-center gap-1.5 shadow-md transition-all ${
            isAutoRotating
              ? 'bg-[#17382D] text-[#FFFDF7] border-[#B69A68]'
              : 'bg-white/80 text-gray-800 border-white/40 hover:bg-white'
          }`}
        >
          {isAutoRotating ? <Pause className="w-3.5 h-3.5 text-[#D8C29D]" /> : <Play className="w-3.5 h-3.5 text-[#17382D]" />}
          <span className="hidden sm:inline">{isAutoRotating ? 'Tạm dừng xoay' : 'Tự động xoay'}</span>
        </button>

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-800 backdrop-blur-md border border-white/40 flex items-center justify-center transition-all shadow-md"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 9. DIMENSION READOUTS (Floating HUD when showDimensions is active) */}
      {showDimensions && (
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md border border-[#2A6B4F]/40 rounded-xl p-2.5 shadow-lg text-[11px] text-[#17382D] space-y-1">
          <div className="font-bold flex items-center gap-1 text-xs text-[#2A6B4F]">
            <span>Kích thước thật ({size}):</span>
          </div>
          <div className="flex gap-3 text-[11px] font-mono">
            <span>Dài: <b>{activeSize.dims.l} cm</b></span>
            <span>Rộng: <b>{activeSize.dims.w} cm</b></span>
            <span>Cao: <b>{activeSize.dims.h} cm</b></span>
          </div>
        </div>
      )}

      {/* 9.5. FOUR PRESET COLOR/MOTIF THUMBNAILS AT BOTTOM (matching reference image) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-auto">
        <div className="bg-[#FAF7F2]/90 backdrop-blur-md p-1 sm:p-1.5 rounded-2xl border border-white/80 shadow-2xl flex items-center gap-1.5 sm:gap-2">
          {[
            { id: 'black', name: 'Đen Mun', bg: '#141416' },
            { id: 'red', name: 'Sơn Then Đỏ', bg: '#6B171E' },
            { id: 'green', name: 'Xanh Lục', bg: '#16382C' },
            { id: 'blue', name: 'Lam Chàm', bg: '#1B2A44' },
          ].map((swatch) => {
            const isSelected = color === swatch.id;
            return (
              <button
                key={swatch.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectColor(swatch.id);
                }}
                title={`Chọn màu ${swatch.name}`}
                className={`relative w-12 h-8 sm:w-16 sm:h-10 rounded-xl overflow-hidden transition-all duration-200 border-2 flex items-center justify-center group ${
                  isSelected 
                    ? 'border-emerald-600 scale-105 shadow-md ring-2 ring-emerald-500/40' 
                    : 'border-transparent opacity-85 hover:opacity-100 hover:scale-102'
                }`}
                style={{ backgroundColor: swatch.bg }}
              >
                {/* Mini decorative mother-of-pearl lotus silhouette */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100">
                  <svg viewBox="0 0 40 24" className="w-8 h-5 text-white/90 drop-shadow">
                    <path
                      d="M 20 4 C 18 10, 16 16, 20 20 C 24 16, 22 10, 20 4 Z"
                      fill="url(#pearlMiniGrad)"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M 20 9 C 14 11, 10 15, 12 19 C 15 19, 18 17, 20 15 Z"
                      fill="url(#pearlMiniGrad)"
                      opacity="0.85"
                    />
                    <path
                      d="M 20 9 C 26 11, 30 15, 28 19 C 25 19, 22 17, 20 15 Z"
                      fill="url(#pearlMiniGrad)"
                      opacity="0.85"
                    />
                    <defs>
                      <linearGradient id="pearlMiniGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFF9EB" />
                        <stop offset="50%" stopColor="#E0F7FA" />
                        <stop offset="100%" stopColor="#FCE4EC" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Glossy sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />

                {/* Checkmark badge when selected */}
                {isSelected && (
                  <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow">
                    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 stroke-current stroke-2 fill-none">
                      <path d="M 2.5 6 L 5 8.5 L 9.5 3.5" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 10. INTERACTION HINT BOTTOM */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 text-[10px] text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none whitespace-nowrap">
        Kéo chuột hoặc vuốt để xoay 360° • Cuộn chuột để phóng to / thu nhỏ
      </div>
    </div>
  );
};
