// src/components/CompteList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import EditCompteModal from './EditCompteModal';

function CompteList({ refresh }) {
    const [comptes, setComptes] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCompte, setSelectedCompte] = useState(null);

    useEffect(() => {
        fetchComptes();
    }, [refresh]);

    const fetchComptes = () => {
        axios.get(`${API_BASE_URL}/comptes`)
            .then(response => setComptes(response.data))
            .catch(error => console.error('Erreur:', error));
    };

    const handleEdit = (compte) => {
        setSelectedCompte(compte);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
            axios.delete(`${API_BASE_URL}/comptes/${id}`)
                .then(() => {
                    fetchComptes();
                    alert('Compte supprimé avec succès');
                })
                .catch(error => {
                    console.error('Erreur:', error);
                    alert('Erreur lors de la suppression');
                });
        }
    };

    return (
        <div className="content-card">
            <h3 className="mb-4">Liste des Comptes</h3>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Solde</th>
                            <th>Date de Création</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comptes.map(compte => (
                            <tr key={compte.id}>
                                <td>{compte.id}</td>
                                <td>{compte.solde.toFixed(2)}</td>
                                <td>{new Date(compte.dateCreation).toLocaleDateString()}</td>
                                <td>{compte.type}</td>
                                <td>
                                    <button 
                                        className="btn btn-action btn-edit"
                                        onClick={() => handleEdit(compte)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        className="btn btn-action btn-delete"
                                        onClick={() => handleDelete(compte.id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {showEditModal && (
                <EditCompteModal
                    compte={selectedCompte}
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    onUpdate={fetchComptes}
                />
            )}
        </div>
    );
}

export default CompteList;