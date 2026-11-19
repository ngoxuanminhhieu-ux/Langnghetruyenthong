import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { FeaturedCollections } from '../components/home/FeaturedCollections';
import { HomeARExperienceSection } from '../components/home/HomeARExperienceSection';
import { HeritageStoryPreview } from '../components/home/HeritageStoryPreview';
import { BestSellers } from '../components/home/BestSellers';
import { ArtisansAndProcess } from '../components/home/ArtisansAndProcess';
import { WorkshopPreview } from '../components/home/WorkshopPreview';

export const HomePage = () => {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Banner - Exactly matches reference image */}
      <HeroBanner />

      {/* 2. Featured Collections - 5 cards as in reference image */}
      <FeaturedCollections />

      {/* 3. Interactive AR / VR & 360° Product Experience Section */}
      <HomeARExperienceSection />

      {/* 4. Heritage Story - Chuôn Ngọ 1000-year history */}
      <HeritageStoryPreview />

      {/* 5. Best Sellers 4-Column Grid */}
      <BestSellers />

      {/* 6. Master Artisans & 6 Sacred Crafting Steps */}
      <ArtisansAndProcess />

      {/* 7. Experience & Workshops */}
      <WorkshopPreview />
    </main>
  );
};

