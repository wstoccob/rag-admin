'use client';

import React, { useState } from 'react';
import { RagSource } from '@/types/ragSource';
import { EditModal } from './EditModal';

interface DataTableProps {
    data: RagSource[];
    onUpdate: (id: string, updated: Partial<RagSource>) => Promise<void>;
    disabled?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ data, onUpdate, disabled = false }) => {
    const [selectedSource, setSelectedSource] = useState<RagSource | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getFileName = (path: string) => path.split('\\').pop() || path.split('/').pop() || path;

    const handleEditClick = (source: RagSource) => {
        if (disabled) return;
        setSelectedSource(source);
        setIsModalOpen(true);
    };

    const handleModalSave = async (updated: Partial<RagSource>) => {
        if (selectedSource) {
            await onUpdate(selectedSource.source_id, updated);
        }
        setIsModalOpen(false);
        setSelectedSource(null);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedSource(null);
    };

    return (
        <>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edition</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publisher</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source URL</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((source, index) => (
                            <tr key={source.source_id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150`}>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <span className="text-sm font-mono text-gray-900">{source.source_id}</span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap max-w-xs" title={source.filename}>
                                    <span className="text-sm text-gray-900 truncate block">{getFileName(source.filename)}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-sm text-gray-900">{source.title || '-'}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-sm text-gray-900">{source.author || '-'}</span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <span className="text-sm text-gray-900">{source.year || '-'}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-sm text-gray-900">{source.edition || '-'}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-sm text-gray-900">{source.publisher || '-'}</span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    {source.source_url ? (
                                        <a
                                            href={source.source_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors duration-150"
                                        >
                                            <span className="text-sm">Link</span>
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ) : (
                                        <span className="text-sm text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <button
                                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md transition-colors duration-150 ${
                                            disabled
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                                        }`}
                                        onClick={() => handleEditClick(source)}
                                        disabled={disabled}
                                    >
                                        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <EditModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                source={selectedSource}
                onSave={handleModalSave}
                disabled={disabled}
            />
        </>
    );
};