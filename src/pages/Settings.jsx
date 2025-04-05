// Settings.js
import React, { useState } from 'react';
import { useAuth } from '../components/Auth/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import profileService from '../api/profile';

export const Settings = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await profileService.updatePersonalInfo(user.id, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone
            });
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const updatedUser = { ...currentUser, ...response.data.user };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.location.reload();
        } catch (error) {
            console.error('Error updating personal info:', error);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            await profileService.updatePassword(user.id, {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            });
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
            window.location.reload();
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-title">Настройки профиля</div>
            <div className="settings-forms-container">
                <form onSubmit={handlePersonalInfoSubmit} className="settings-form">
                    <div className="settings-section">
                        <h3>Личные данные</h3>
                        <div className="form-setting-group">
                            <label>Имя</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-setting-group">
                            <label>Фамилия</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-setting-group">
                            <label>Телефон</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button onClick={handlePersonalInfoSubmit} className="settings-save-btn">
                        Сохранить личные данные
                    </button>
                </form>
                <form onSubmit={handlePasswordSubmit} className="settings-form">
                    <div className="settings-section">
                        <h3>Изменить пароль</h3>
                        <div className="form-setting-group">
                            <label>Текущий пароль</label>
                            <div className="password-input-container">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon 
                                    icon={showCurrentPassword ? faEyeSlash : faEye}
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="password-setting-toggle-icon"
                                />
                            </div>
                        </div>
                        <div className="form-setting-group">
                            <label>Новый пароль</label>
                            <div className="password-input-container">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon 
                                    icon={showNewPassword ? faEyeSlash : faEye}
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="password-setting-toggle-icon"
                                />
                            </div>
                        </div>
                        <div className="form-setting-group">
                            <label>Подтвердите новый пароль</label>
                            <div className="password-input-container">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon 
                                    icon={showConfirmPassword ? faEyeSlash : faEye}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="password-setting-toggle-icon"
                                />
                            </div>
                        </div>
                    </div>
                    <button onClick={handlePasswordSubmit} className="settings-save-btn">
                        Обновить пароль
                    </button>
                </form>
            </div>
        </div>
    );
};