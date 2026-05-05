import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiClock } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-24 px-6 rounded-2xl shadow-lg relative">
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to Smart Government Scheme Portal
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-grey-100 leading-relaxed">
            Access government schemes, apply online, and track your applications seamlessly
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/register" className="btn-primary inline-flex items-center text-lg">
              Get Started <FiArrowRight className="ml-2" />
            </Link>
            <Link to="/login" className="btn-secondary inline-flex items-center text-lg">
              Login
            </Link>
            <Link to="/admin-login" className="btn-primary inline-flex items-center text-lg">
              Admin Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          { 
            icon: FiCheckCircle, 
            title: 'Easy Registration', 
            desc: 'Quick and simple signup process with minimal documentation' 
          },
          { 
            icon: FiClock, 
            title: 'Track Status', 
            desc: 'Real-time application tracking with instant notifications' 
          },
          { 
            icon: FiCheckCircle, 
            title: 'Eligibility Checker', 
            desc: 'Find schemes you qualify for instantly with our smart tool' 
          }
        ].map((feature, idx) => (
          <div key={idx} className="card text-center group">
            <div className="w-16 h-16 bg-blue-grey-100 dark:bg-blue-grey-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
              <feature.icon className="text-primary dark:text-blue-grey-200 text-3xl group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
            <p className="text-white leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="section-bg rounded-2xl shadow-sm">
        <div className="text-center py-16 px-6">
          <h2 className="text-4xl font-bold text-white dark:text-white mb-4">
            🎯 Try Our Eligibility Checker!
          </h2>
          <p className="text-white dark:text-blue-grey-100 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
            Find out which government schemes you're eligible for in just 2 minutes
          </p>
          <Link to="/register" className="btn-primary inline-flex items-center text-lg">
            Register to Check Eligibility <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid md:grid-cols-4 gap-6">
        {[
          { number: '50+', label: 'Government Schemes' },
          { number: '10K+', label: 'Applications Processed' },
          { number: '95%', label: 'Approval Rate' },
          { number: '24/7', label: 'Support Available' }
        ].map((stat, idx) => (
          <div key={idx} className="card text-center">
            <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
            <div className="text-white font-medium">{stat.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
