import React from 'react';

const NewsSection = () => {
  const articles = [
    {
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
      category: 'Actualité',
      title: 'Les taux immobiliers en 2024',
      date: '15 Mars 2024'
    },
    {
      image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5',
      category: 'Guide',
      title: 'Comment bien estimer son bien ?',
      date: '14 Mars 2024'
    },
    {
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb',
      category: 'Conseils',
      title: 'Les étapes clés d\'un achat immobilier',
      date: '13 Mars 2024'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif text-gray-900 mb-8">Actualités Immobilières</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(({ image, category, title, date }) => (
            <article key={title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img src={image} alt={title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm font-medium text-indigo-600">{category}</span>
                  <span className="text-sm text-gray-500">{date}</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
                <a href="#" className="text-indigo-600 font-medium hover:text-indigo-700">
                  Lire la suite →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;