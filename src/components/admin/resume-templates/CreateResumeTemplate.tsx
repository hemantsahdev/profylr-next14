"use client";

import React, { useState } from "react";
import {
    Save,
    X,
    Eye,
    Plus,
    Tags,
    Building2,
    Layout,
    FileCode,
    AlertCircle,
} from "lucide-react";

// Tab type definition
type Tab = "header" | "experience" | "education" | "skills" | "certifications";

function CreateResumeTemplate() {
    const [activeTab, setActiveTab] = useState<Tab>("header");
    const [categories, setCategories] = useState<string[]>([]);
    const [departments, setDepartments] = useState<string[]>([]);

    // Sample data for dropdowns
    const availableCategories = ["Professional", "Creative", "Academic", "Technical", "Executive"];
    const availableDepartments = ["Engineering", "Marketing", "Sales", "Finance", "HR", "Design"];

    const handleAddTag = (type: "category" | "department", value: string) => {
        if (type === "category" && !categories.includes(value)) {
            setCategories([...categories, value]);
        } else if (type === "department" && !departments.includes(value)) {
            setDepartments([...departments, value]);
        }
    };

    const handleRemoveTag = (type: "category" | "department", value: string) => {
        if (type === "category") {
            setCategories(categories.filter(cat => cat !== value));
        } else {
            setDepartments(departments.filter(dep => dep !== value));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-8 py-6">
                <h1 className="text-2xl font-bold text-gray-900">Add Resume Template</h1>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Template Information Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter template name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
                            </label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={1}
                                placeholder="Enter template description"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6">
                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Tags size={16} />
                Categories
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onChange={(e) => handleAddTag("category", e.target.value)}
                                    value=""
                                >
                                    <option value="">Add category...</option>
                                    {availableCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {categories.map(category => (
                                    <span
                                        key={category}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                    >
                                        {category}
                                        <button
                                            onClick={() => handleRemoveTag("category", category)}
                                            className="ml-2 text-blue-600 hover:text-blue-800"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Departments */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Building2 size={16} />
                Departments
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onChange={(e) => handleAddTag("department", e.target.value)}
                                    value=""
                                >
                                    <option value="">Add department...</option>
                                    {availableDepartments.map(dep => (
                                        <option key={dep} value={dep}>{dep}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {departments.map(department => (
                                    <span
                                        key={department}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                                    >
                                        {department}
                                        <button
                                            onClick={() => handleRemoveTag("department", department)}
                                            className="ml-2 text-green-600 hover:text-green-800"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Editor */}
                <div className="bg-white rounded-lg shadow-sm mb-24">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            {[
                                { id: "header", label: "Header", icon: Layout },
                                { id: "experience", label: "Experience", icon: Building2 },
                                { id: "education", label: "Education", icon: FileCode },
                                { id: "skills", label: "Skills", icon: Tags },
                                { id: "certifications", label: "Certifications", icon: AlertCircle },
                            ].map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id as Tab)}
                                    className={`
                    flex items-center px-6 py-4 text-sm font-medium border-b-2 
                    ${activeTab === id
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }
                  `}
                                >
                                    <Icon size={16} className="mr-2" />
                                    {label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Editor Area */}
                    <div className="p-6">
                        <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400">HTML Editor</span>
                                <button
                                    className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    <Eye size={16} className="mr-2" />
                  Preview Section
                                </button>
                            </div>
                            <textarea
                                className="w-full bg-gray-800 text-gray-100 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={10}
                                placeholder="Enter your HTML code here..."
                            />
                        </div>
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-4">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <button
                            className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <X size={16} className="mr-2" />
              Cancel
                        </button>
                        <div className="flex gap-4">
                            <button
                                className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Eye size={16} className="mr-2" />
                Preview Template
                            </button>
                            <button
                                className="inline-flex items-center px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                                <Save size={16} className="mr-2" />
                Save Template
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateResumeTemplate;