import { Navigate, Route, Routes } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ScrollToTop } from './components/ScrollToTop';
import { Ticker } from './components/Ticker';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { MediaBlog, MediaEvents, MediaGallery, MediaLayout } from './pages/Media';
import { NotFound } from './pages/NotFound';
import { Sectors } from './pages/Sectors';
import { Services } from './pages/Services';
import { Training } from './pages/Training';

function App() {
	return (
		<div className="flex min-h-screen flex-col">
			<ScrollToTop />
			<Ticker />
			<Header />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/sectors" element={<Sectors />} />
					<Route path="/services" element={<Services />} />
					<Route path="/training" element={<Training />} />
					<Route path="/media" element={<MediaLayout />}>
						<Route index element={<Navigate to="/media/blog" replace />} />
						<Route path="blog" element={<MediaBlog />} />
						<Route path="events" element={<MediaEvents />} />
						<Route path="gallery" element={<MediaGallery />} />
					</Route>
					<Route path="/careers" element={<Careers />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
