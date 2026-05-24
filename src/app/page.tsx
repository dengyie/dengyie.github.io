import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Hero from '@/components/Hero/Hero';
import FeaturedPosts from '@/components/FeaturedPosts/FeaturedPosts';
import CategoryExplorer from '@/components/CategoryExplorer/CategoryExplorer';
import AboutSnippet from '@/components/AboutSnippet/AboutSnippet';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedPosts />
        <CategoryExplorer />
        <AboutSnippet />
      </main>
      <Footer />
    </>
  );
}
