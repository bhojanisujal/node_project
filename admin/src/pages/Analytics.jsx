import React from 'react';
import HOC from '../compoent/HOC';

const Analytics = () => {
  const metrics = [
    { name: 'Page Views', value: '1.2M', trend: '+15%', color: 'from-blue-500 to-cyan-500' },
    { name: 'Unique Visitors', value: '234K', trend: '+8%', color: 'from-cyan-500 to-teal-500' },
    { name: 'Bounce Rate', value: '23.1%', trend: '-5%', color: 'from-teal-500 to-green-500' },
    { name: 'Avg. Session', value: '4m 32s', trend: '+12%', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your website performance and user engagement metrics.</p>
        </div>
        <div className="flex space-x-3">
          <select className="bg-slate-800 text-white border border-slate-600 rounded-lg px-4 py-2 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all duration-200">
            Export Data
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="shadow-md border border-transparent  rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 rounded-xl p-6  border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center mb-4`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
            <p className="text-gray-400 text-sm mb-2">{metric.name}</p>
            <span className="text-green-400 text-sm font-medium">{metric.trend} from last period</span>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-md border border-transparent   backdrop-blur-3xl rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 rounded-xl p-6 border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {[
              { source: 'Organic Search', percentage: 45, color: 'bg-cyan-500' },
              { source: 'Direct Traffic', percentage: 30, color: 'bg-teal-500' },
              { source: 'Social Media', percentage: 15, color: 'bg-blue-500' },
              { source: 'Referrals', percentage: 10, color: 'bg-green-500' },
            ].map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300">{source.source}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-slate-700 rounded-full h-2">
                    <div
                      className={`${source.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium w-8">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-md border border-transparent backdrop-blur-3xl   rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 rounded-xl p-6 border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Top Pages</h3>
          <div className="space-y-4">
            {[
              { page: '/dashboard', views: '45.2K', change: '+12%' },
              { page: '/analytics', views: '32.1K', change: '+8%' },
              { page: '/users', views: '21.5K', change: '+15%' },
              { page: '/settings', views: '18.3K', change: '+5%' },
            ].map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg shadow-md border border-transparent backdrop-blur-3xl   rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105transition-colors duration-200">
                <div>
                  <p className="text-white font-medium">{page.page}</p>
                  <p className="text-gray-400 text-sm">{page.views} views</p>
                </div>
                <span className="text-green-400 text-sm font-medium">{page.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOC(Analytics);