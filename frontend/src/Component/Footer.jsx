import React from 'react';
import { useTheme } from '../ThemeProvider';

const footerLinks = [
  {
    title: 'Courses',
    links: ['All Courses', 'Popular Courses', 'New Courses', 'Video Lectures', 'Assignments'],
  },
  {
    title: 'Student Resources',
    links: ['Study Materials', 'Notes', 'Exams', 'Results', 'Support'],
  },
  {
    title: 'About',
    links: ['About Us', 'Our Team', 'Blog', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Terms of Service', 'Privacy Policy', 'License'],
  },
];

const PRIMARY_COLOR = '#2563EB';
const PRIMARY_COLOR_HOVER = '#1e4db7'; // Slightly darker for hover

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`w-full font-serif text-base font-medium border-t ${
        isDarkMode ? 'bg-gray-900 text-gray-200 border-gray-700' : 'bg-white text-gray-800 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-bold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition-colors duration-150"
                      style={{ color: 'inherit' }}
                      onMouseOver={e => (e.currentTarget.style.color = PRIMARY_COLOR)}
                      onMouseOut={e => (e.currentTarget.style.color = 'inherit')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-xl">
          <h4 className="font-semibold mb-1">Subscribe to Apna Academy Updates</h4>
          <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            Get the latest course updates, study tips, and educational resources delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className={`rounded-md border px-4 py-2 flex-1 outline-none focus:ring-2 transition-all ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
              }`}
              style={{ borderColor: PRIMARY_COLOR, boxShadow: `0 0 0 2px transparent` }}
              onFocus={e => (e.currentTarget.style.boxShadow = `0 0 0 2px ${PRIMARY_COLOR}`)}
              onBlur={e => (e.currentTarget.style.boxShadow = '0 0 0 2px transparent')}
            />
            <button
              type="submit"
              className="font-semibold px-6 py-2 rounded-md transition-colors"
              style={{ backgroundColor: PRIMARY_COLOR, color: '#fff' }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = PRIMARY_COLOR_HOVER)}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = PRIMARY_COLOR)}
            >
              Subscribe
            </button>
          </form>
        </div>
        <hr className={`my-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Apna Academy. Empowering Education for Everyone.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
