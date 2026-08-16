import { Navigate, Route, Routes } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ScrollToTop } from './components/ScrollToTop';
import { AdminLayout } from './components/admin/AdminLayout';
import { AuthProvider } from './contexts/AuthContext';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import {
	MediaBlog,
	MediaEventDetail,
	MediaEvents,
	MediaGallery,
	MediaLayout,
	MediaNews,
	MediaPostDetail,
} from './pages/Media';
import { NotFound } from './pages/NotFound';
import { Sectors } from './pages/Sectors';
import { Services } from './pages/Services';
import { Training } from './pages/Training';
import { Categories } from './pages/admin/Categories';
import { Dashboard } from './pages/admin/Dashboard';
import { EventForm } from './pages/admin/EventForm';
import { EventTypes } from './pages/admin/EventTypes';
import { Events } from './pages/admin/Events';
import { Login } from './pages/admin/Login';
import { PostForm } from './pages/admin/PostForm';
import { Posts } from './pages/admin/Posts';
import { Users } from './pages/admin/Users';

function PublicSite() {
	return (
		<div className="flex min-h-screen flex-col">
			<ScrollToTop />
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
						<Route path="blog/:slug" element={<MediaPostDetail />} />
						<Route path="news" element={<MediaNews />} />
						<Route path="news/:slug" element={<MediaPostDetail />} />
						<Route path="events" element={<MediaEvents />} />
						<Route path="events/:slug" element={<MediaEventDetail />} />
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

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/eneryetu/login" element={<Login />} />
				<Route path="/eneryetu" element={<AdminLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="users" element={<Users />} />
					<Route path="posts" element={<Posts />} />
					<Route path="posts/new" element={<PostForm />} />
					<Route path="posts/:id" element={<PostForm />} />
					<Route path="events" element={<Events />} />
					<Route path="events/new" element={<EventForm />} />
					<Route path="events/:id" element={<EventForm />} />
					<Route path="categories" element={<Categories />} />
					<Route path="event-types" element={<EventTypes />} />
				</Route>
				<Route path="/*" element={<PublicSite />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
