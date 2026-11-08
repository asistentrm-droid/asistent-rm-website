import React, { useState, useEffect } from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';
import { adminFetch } from '../lib/api';

const AdminSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    basic_info: '',
    services: '',
    pricing: '',
    faq: '',
    contact: '',
    working_hours: '',
    demo_info: '',
    other_info: ''
  });


  useEffect(() => {
    // Load existing data
    adminFetch(`/api/admin/company-data`)
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setFormData(data);
        }
      })
      .catch(err => console.error('Error loading data:', err));
  }, []);

  const questions = [
    {
      title: 'Osnovne informacije o podjetju',
      field: 'basic_info',
      placeholder: 'Npr: Ime podjetja, področje delovanja, lokacija, kratka predstavitev...'
    },
    {
      title: 'Katere storitve nudite?',
      field: 'services',
      placeholder: 'Opišite vse storitve, ki jih ponujate. Npr: AI receptorka, virtualna tajnica, sprejem klicev...'
    },
    {
      title: 'Cene in paketi',
      field: 'pricing',
      placeholder: 'Navedite cene vaših storitev, pakete, brezplačne preizkuse, cenike...'
    },
    {
      title: 'Pogosta vprašanja (FAQ)',
      field: 'faq',
      placeholder: 'Najpogostejša vprašanja strank in odgovori nanje...'
    },
    {
      title: 'Kontaktni podatki',
      field: 'contact',
      placeholder: 'Telefon, email, naslov, spletna stran...'
    },
    {
      title: 'Delovni čas',
      field: 'working_hours',
      placeholder: 'Kdaj ste dosegljivi? Npr: Pon-Pet 8:00-16:00...'
    },
    {
      title: 'Kako deluje demo?',
      field: 'demo_info',
      placeholder: 'Kako lahko stranke preizkusijo vašo storitev? Proces testiranja...'
    },
    {
      title: 'Dodatne informacije',
      field: 'other_info',
      placeholder: 'Karkoli drugega, kar bi chatbot moral vedeti o vašem podjetju...'
    }
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSave();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    try {
      const response = await adminFetch(`/api/admin/company-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => {
          navigate('/admin/chats');
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Napaka pri shranjevanju podatkov');
    }
  };

  const handleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      [questions[currentStep].field]: value
    }));
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (saved) {
    return (
      <div className="admin-container">
        <div className="admin-success">
          <div className="success-icon">
            <Check size={48} />
          </div>
          <h1>Podatki shranjeni! ✓</h1>
          <p>Vaš AI chatbot je zdaj pripravljen za uporabo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <button onClick={() => navigate('/')} className="back-btn">
          <ArrowLeft size={20} />
          <span>Nazaj</span>
        </button>
        <h1>Nastavitev AI Chatbota</h1>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="step-counter">Korak {currentStep + 1} od {questions.length}</p>
      </div>

      <div className="quiz-container">
        <div className="question-card">
          <h2>{currentQuestion.title}</h2>
          <textarea
            value={formData[currentQuestion.field]}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            rows={8}
            className="quiz-textarea"
          />
          
          <div className="quiz-actions">
            {currentStep > 0 && (
              <button onClick={handleBack} className="btn-secondary">
                Nazaj
              </button>
            )}
            <button onClick={handleNext} className="btn-primary">
              {currentStep === questions.length - 1 ? 'Shrani' : 'Naprej'}
            </button>
          </div>
        </div>

        <div className="quiz-navigation">
          {questions.map((q, idx) => (
            <button
              key={idx}
              className={`nav-dot ${idx === currentStep ? 'active' : ''} ${formData[q.field] ? 'filled' : ''}`}
              onClick={() => setCurrentStep(idx)}
              title={q.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
