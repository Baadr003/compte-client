// src/components/EditCompteModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import API_BASE_URL from '../config';

function EditCompteModal({ compte, show, onHide, onUpdate }) {
    const [formData, setFormData] = useState({
        solde: compte.solde,
        dateCreation: compte.dateCreation.split('T')[0],
        type: compte.type
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${API_BASE_URL}/comptes/${compte.id}`, formData)
            .then(() => {
                onUpdate();
                onHide();
                alert('Compte modifié avec succès');
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Erreur lors de la modification');
            });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Modifier le compte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Solde</Form.Label>
                        <Form.Control
                            type="number"
                            name="solde"
                            value={formData.solde}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date de création</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateCreation"
                            value={formData.dateCreation}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="COURANT">COURANT</option>
                            <option value="EPARGNE">EPARGNE</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="text-end">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Annuler
                        </Button>
                        <Button variant="primary" type="submit">
                            Sauvegarder
                        </Button>
                    </div>
                </Form>
                </Modal.Body>
        </Modal>
    );
}

export default EditCompteModal;