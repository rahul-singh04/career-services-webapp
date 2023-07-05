import React, { useState } from 'react';

const RoleDropdown = ({ onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    onSelectRole(role); // Call the callback function with the selected role
  };

  return (
    <div className="bg-gray-100">
        <div className="mb-4">
          <select
            id="role"
            className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="employer">Employer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
    </div>
  );
};

export default RoleDropdown;
