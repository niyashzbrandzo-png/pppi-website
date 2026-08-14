import React from 'react';
import Hero from '../components/Hero';
import StatsCounter from '../components/StatsCounter';
import AboutSection from '../components/AboutSection';
import FounderSection from '../components/FounderSection';
import LeadershipSection from '../components/LeadershipSection';
import WhyChooseSection from '../components/WhyChooseSection';
import MobileAppSection from '../components/MobileAppSection';
import AdminPortalSection from '../components/AdminPortalSection';
import InfrastructureSection from '../components/InfrastructureSection';
import MembershipPlans from '../components/MembershipPlans';
import ManifestoSection from '../components/ManifestoSection';
import EventsSection from '../components/EventsSection';
import NewsSection from '../components/NewsSection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

export default function HomePage({
  openMembershipModal,
  openEventModal,
  openLightbox,
  setActivePage,
  addToast,
}) {
  return (
    <main>
      <Hero openMembershipModal={openMembershipModal} setActivePage={setActivePage} />
      <StatsCounter />
      <AboutSection setActivePage={setActivePage} />
      <FounderSection setActivePage={setActivePage} />
      <LeadershipSection setActivePage={setActivePage} />
      <WhyChooseSection />
      <MobileAppSection />
      <AdminPortalSection />
      <InfrastructureSection />
      <MembershipPlans openMembershipModal={openMembershipModal} />
      <ManifestoSection setActivePage={setActivePage} />
      <EventsSection openEventModal={openEventModal} />
      <NewsSection setActivePage={setActivePage} />
      <GallerySection openLightbox={openLightbox} />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection addToast={addToast} />
    </main>
  );
}
