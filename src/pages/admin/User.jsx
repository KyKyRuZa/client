import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEdit, 
    faTrash, 
    faUserShield, 
    faSearch,
    faFilter,
    faSort,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import profileService from '../../api/profile';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await profileService.getAllUsers();
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleSort = (field) => {
        const direction = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(direction);
        
        const sortedUsers = [...users].sort((a, b) => {
            if (direction === 'asc') {
                return a[field] > b[field] ? 1 : -1;
            }
            return a[field] < b[field] ? 1 : -1;
        });
        setUsers(sortedUsers);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            try {
                await profileService.deleteUser(userId);
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const filteredUsers = users.filter(user => 
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
       );

    return (
        <div className="admin-users-container">
            <div className="users-header">
                <h2>Управление пользователями</h2>
                <div className="users-actions">
                    <div className="search-box">
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            placeholder="Поиск пользователей..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="add-user-btn">
                        <FontAwesomeIcon icon={faUserPlus} /> Добавить пользователя
                    </button>
                </div>
            </div>

            {loading ? (
                <div>Загрузка пользователей...</div>
            ) : (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('id')}>
                                ID <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th onClick={() => handleSort('username')}>
                                Имя пользователя <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th onClick={() => handleSort('email')}>
                                Email <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th onClick={() => handleSort('role')}>
                                Роль <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th onClick={() => handleSort('created_at')}>
                                Дата регистрации <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{`${user.firstName} ${user.lastName}`}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="action-buttons">
                                    <button className="edit-btn">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};


