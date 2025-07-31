import React from "react";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
}

const LeadsTable = ({ leads, onViewDetails, onEditLead }) => {
  const renderStatus = (connected, interested) => {
    if (connected && interested) {
      return <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Connected & Interested</span>;
    } else if (connected) {
      return <span className="inline-block px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Connected</span>;
    } else if (interested) {
      return <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Interested</span>;
    } else {
      return <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Not Connected</span>;
    }
  };

  const renderEnrollmentStatus = (enrolled, filled) => {
    if (enrolled && filled) {
      return <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Complete</span>;
    } else if (enrolled) {
      return <span className="inline-block px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Enrolled</span>;
    } else {
      return <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Not Enrolled</span>;
    }
  };

  const renderSource = (source) => {
    const sourceColors = {
      'LinkedIn': 'bg-blue-100 text-blue-800',
      'Referral': 'bg-green-100 text-green-800',
      'Naukri': 'bg-orange-100 text-orange-800',
      'Indeed': 'bg-purple-100 text-purple-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${sourceColors[source] || sourceColors['Other']}`}>
        {source}
      </span>
    );
  };

  const renderAvatar = (name) => {
    if (!name) return '';
    
    const colors = [
      'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
      'bg-indigo-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'
    ];
    
    const color = colors[name.length % colors.length];
    
    return (
      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium ${color}`}>
        {name.toUpperCase().substring(0, 1)}
      </div>
    );
  };

  return (
    <section className='bg-white dark:bg-dark py-8 lg:py-12'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap -mx-4'>
          <div className='w-full'>
            <div className='max-w-full overflow-x-auto'>
              <table className='w-full table-auto'>
                <thead className='text-center bg-primary'>
                  <tr>
                    <th className={TdStyle.ThStyle}>Candidate</th>
                    <th className={TdStyle.ThStyle}>Email</th>
                    <th className={TdStyle.ThStyle}>Phone</th>
                    <th className={TdStyle.ThStyle}>Source</th>
                    <th className={TdStyle.ThStyle}>Status</th>
                    <th className={TdStyle.ThStyle}>Enrollment</th>
                    <th className={TdStyle.ThStyle}>Created</th>
                    <th className={TdStyle.ThStyle}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead, index) => (
                    <tr key={lead.id}>
                      <td className={TdStyle.TdStyle}>
                        <div className="flex items-center justify-center space-x-2">
                          {renderAvatar(lead.name)}
                          <span className="font-medium">{lead.name}</span>
                        </div>
                      </td>
                      <td className={TdStyle.TdStyle2}>
                        <div className="flex items-center justify-center space-x-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm">{lead.email}</span>
                        </div>
                      </td>
                      <td className={TdStyle.TdStyle}>
                        <div className="flex items-center justify-center space-x-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-sm">{lead.phone}</span>
                        </div>
                      </td>
                      <td className={TdStyle.TdStyle2}>
                        {renderSource(lead.source)}
                      </td>
                      <td className={TdStyle.TdStyle}>
                        {renderStatus(lead.connected_on_call, lead.interested)}
                      </td>
                      <td className={TdStyle.TdStyle2}>
                        {renderEnrollmentStatus(lead.enrolled_or_not, lead.filled_candidate_or_not)}
                      </td>
                      <td className={TdStyle.TdStyle}>
                        <span className="text-sm text-gray-600">{lead.created_at}</span>
                      </td>
                      <td className={TdStyle.TdStyle2}>
                        <div className="flex items-center justify-center space-x-2">
                          <button 
                            onClick={() => onViewDetails(lead)}
                            className="inline-block px-3 py-1.5 border rounded-md border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-xs font-medium transition-colors"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => onEditLead(lead)}
                            className="inline-block px-3 py-1.5 border rounded-md border-green-500 text-green-500 hover:bg-green-500 hover:text-white text-xs font-medium transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadsTable; 