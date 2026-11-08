import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Wrench, Heart, Home, Building2, Truck, UtensilsCrossed, Scale, Dumbbell, PawPrint, Calculator, Laptop, HardHat, ShoppingBag, Plane, ArrowRight } from 'lucide-react';
import { industries } from '../data/industries';

const ICONS = {
  'zdravstveni-domovi': Heart,
  'banke-finance': Building2,
  'logistika-dostava': Truck,
  'restavracije-gostinstvo': UtensilsCrossed,
  'avtomobilske-delavnice': Wrench,
  'nepremicninske-agencije': Home,
  'frizerski-kozmeticni-saloni': Scissors,
  'pravne-pisarne-odvetniki': Scale,
  'gradbena-podjetja': HardHat,
  'it-support-tech': Laptop,
  'fitnes-centri': Dumbbell,
  'veterinarske-ambulante': PawPrint,
  'racunovodski-servisi': Calculator,
  'trgovine-ecommerce': ShoppingBag,
  'turisticne-agencije': Plane,
};

export const FEATURED = ['zdravstveni-domovi', 'frizerski-kozmeticni-saloni', 'avtomobilske-delavnice', 'restavracije-gostinstvo', 'pravne-pisarne-odvetniki', 'nepremicninske-agencije'];

const IndustryGrid = ({ only }) => {
  const list = only ? only.map((id) => industries.find((i) => i.id === id)).filter(Boolean) : industries;
  return (
    <div className="ind-grid">
      {list.map((ind) => {
        const Icon = ICONS[ind.id] || Building2;
        return (
          <Link key={ind.id} to={`/panoge/${ind.id}`} className="ind-card">
            <span className="ind-icon"><Icon size={22} aria-hidden="true" /></span>
            <span className="ind-text">
              <strong>{ind.name}</strong>
              <span>{ind.subtitle}</span>
            </span>
            <ArrowRight className="ind-arrow" size={18} aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
};

export default IndustryGrid;
