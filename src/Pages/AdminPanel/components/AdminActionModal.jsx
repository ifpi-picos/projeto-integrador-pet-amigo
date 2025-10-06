import React from 'react';

function AdminActionModal({ title, onClose, children }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>{title}</h2>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminActionModal;