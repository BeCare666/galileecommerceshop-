export default function HeaderTop() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-sm px-4 py-2 w-full border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <a
            href="mailto:info@galileecommerce.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition flex items-center"
          >
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h15A2.5 2.5 0 0 1 22 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-15Zm2.75.25v.52L12 12.08l7.25-6.81v-.52H4.75Zm14.5 2.09L12.3 13.35a.75.75 0 0 1-.6.15.75.75 0 0 1-.35-.18L4.75 6.84V19.5h14.5V6.84Z" />
            </svg>
            <span className="ml-2">info@galileecommerce.com</span>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M22 12A10 10 0 1 0 10.08 22v-7.07H7.1V12h2.98v-2.26c0-3 1.79-4.66 4.52-4.66 1.31 0 2.68.24 2.68.24v2.95H15.9c-1.5 0-1.96.93-1.96 1.89V12h3.33l-.53 2.93h-2.8V22A10 10 0 0 0 22 12Z" />
            </svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M16.5 3c1.2 1 2.6 1.5 4.1 1.5v3.1a8.5 8.5 0 0 1-4.1-1V15a6.5 6.5 0 1 1-6.5-6.5v3A3.5 3.5 0 1 0 13.5 15V2.25h3V3Z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.75a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>

  );
}
// This code defines a React functional component named HeaderTop that renders a top header section for a website.
// The header includes contact information, social media links, and uses Tailwind CSS for styling.