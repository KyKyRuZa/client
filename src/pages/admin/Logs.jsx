import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilter, FaSearch } from 'react-icons/fa';

export const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/logs');
      setLogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLoading(false);
    }
  };

  const filterLogs = (logs) => {
    return logs
      .filter(log => {
        if (filter === 'all') return true;
        return log.user.role === filter;
      })
      .filter(log => 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return <div>Loading logs...</div>;
  }

  return (
    <div className="logs-container">
      <h1 className="logs-title">System Logs</h1>
      
      <div className="logs-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <FaFilter />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="superadmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="contentmaker">Content Maker</option>
          </select>
        </div>
      </div>

      <table className="logs-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Role</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filterLogs(logs).map((log) => (
            <tr key={log._id}>
              <td>{formatDate(log.timestamp)}</td>
              <td>{log.userEmail}</td>
              <td>
                <span className={`role-badge ${log.user.role}`}>
                  {log.user.role}
                </span>
              </td>
              <td>{log.action}</td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

 