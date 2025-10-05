import React from 'react';
import '../css/Card.css';

const StatsCards = () => {
  const stats = [
    { title: 'Total Income', value: '$78.8k' },
    { title: 'New Users', value: '2,150' },
    { title: 'Orders', value: '1,784' },
    { title: 'Conversion Rate', value: '12.3%' },
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <div key={index} className="card">
          <h4>{stat.title}</h4>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
