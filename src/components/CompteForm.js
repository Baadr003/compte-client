// src/components/CompteForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import API_BASE_URL from '../config';

function CompteForm({ onAdd }) {
    const [compte, setCompte] = useState({
        solde: '',
        dateCreation: new Date().toISOString().split('T')[0],
        type: 'COURANT'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        if (!compte.solde || isNaN(compte.solde)) {
            setError('Le solde doit être un nombre valide');
            return false;
        }
        if (!compte.dateCreation) {
            setError('La date de création est requise');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!validateForm()) return;

        setLoading(true);
        try {
            const formattedCompte = {
                ...compte,
                solde: parseFloat(compte.solde),
                dateCreation: new Date(compte.dateCreation).toISOString()
            };

            await axios.post(`${API_BASE_URL}/comptes`, formattedCompte);
            setSuccess(true);
            setCompte({
                solde: '',
                dateCreation: new Date().toISOString().split('T')[0],
                type: 'COURANT'
            });
            onAdd();
        } catch (error) {
            console.error('Erreur:', error);
            setError(error.response?.data?.message || 'Erreur lors de la création du compte');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="compte-form-container">
            <div className="compte-form-header">
                <h3>Nouveau Compte</h3>
            </div>
            
            <div className="compte-form-content">
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">Compte créé avec succès!</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                        <Form.Label>Solde Initial</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={compte.solde}
                            onChange={(e) => setCompte({...compte, solde: e.target.value})}
                            required
                            className="form-control-custom"
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>Date de Création</Form.Label>
                        <Form.Control
                            type="date"
                            value={compte.dateCreation}
                            onChange={(e) => setCompte({...compte, dateCreation: e.target.value})}
                            required
                            className="form-control-custom"
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>Type de Compte</Form.Label>
                        <Form.Select
                            value={compte.type}
                            onChange={(e) => setCompte({...compte, type: e.target.value})}
                            className="form-control-custom"
                        >
                            <option value="COURANT">COURANT</option>
                            <option value="EPARGNE">EPARGNE</option>
                        </Form.Select>
                    </Form.Group>

                    <Button 
                        type="submit" 
                        className="submit-button" 
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                {' '}Création en cours...
                            </>
                        ) : (
                            'Créer le compte'
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default CompteForm;