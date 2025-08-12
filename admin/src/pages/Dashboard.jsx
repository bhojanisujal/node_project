import React from 'react';
import HOC from '../compoent/HOC';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
    },
    {
      title: 'Active Users',
      value: '2,350',
      change: '+180.1%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: 'Total Orders',
      value: '12,234',
      change: '-19%',
      changeType: 'negative',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: 'Conversion Rate',
      value: '98.5%',
      change: '+12%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const recentActivities = [
    { id: 1, user: 'Alice Johnson', action: 'Created new project', time: '2 minutes ago', avatar: 'AJ' },
    { id: 2, user: 'Bob Smith', action: 'Updated user settings', time: '15 minutes ago', avatar: 'BS' },
    { id: 3, user: 'Carol Williams', action: 'Completed task #247', time: '1 hour ago', avatar: 'CW' },
    { id: 4, user: 'David Brown', action: 'Posted new comment', time: '2 hours ago', avatar: 'DB' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl p-6 backdrop-blur-3xl shadow-md border border-transparent   hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-cyan-400">{stat.icon}</div>
              <span
                className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive'
                    ? 'text-green-400 bg-green-400/10'
                    : 'text-red-400 bg-red-400/10'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="backdrop-blur-3xl shadow-md border border-transparent  rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Revenue Overview</h3>
          <div className="h-64 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
            <div className="text-center">
              <svg className="w-16 h-16 text-cyan-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-400">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="backdrop-blur-3xl shadow-md border border-transparent  rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3  border border-transparent  rounded-lg hover:border-cyan-500/50 hover:shadow-lg transition-colors duration-200">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.user}</p>
                  <p className="text-gray-400 text-sm">{activity.action}</p>
                </div>
                <span className="text-gray-500 text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOC(Dashboard);