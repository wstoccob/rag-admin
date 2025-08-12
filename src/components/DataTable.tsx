'use client';

import React, { useState } from 'react';
import { RagSource } from '@/types/ragSource';
import { EditModal } from './EditModal';
import { Button } from './ui/Button';
import { getFileName } from '@/lib/utils';

interface DataTableProps {
  data: RagSource[];
  onUpdate: (id: string, updated: Partial<RagSource>) => Promise<void>;
  disabled?: boolean;
}

// Table column configuration
const TABLE_COLUMNS = [
  { key: 'source_id', label: 'Source ID', className: 'font-mono' },
  { key: 'filename', label: 'File Name', className: 'max-w-xs truncate' },
  { key: 'title', label: 'Title', className: '' },
  { key: 'author', label: 'Author', className: '' },
  { key: 'year', label: 'Year', className: '' },
  { key: 'edition', label: 'Edition', className: '' },
  { key: 'publisher', label: 'Publisher', className: '' },
  { key: 'source_url', label: 'Source URL', className: '' },
  { key: 'actions', label: 'Actions', className: '' },
] as const;

export const DataTable: React.FC<DataTableProps> = ({ 
  data, 
  onUpdate, 
  disabled = false 
}) => {
  const [selectedSource, setSelectedSource] = useState<RagSource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const renderCell = (source: RagSource, columnKey: string) => {
    switch (columnKey) {
      case 'source_id':
        return (
          <span className="text-sm font-mono text-gray-900">
            {source.source_id}
          </span>
        );
      
      case 'filename':
        return (
          <span 
            className="text-sm text-gray-900 truncate block" 
            title={source.filename}
          >
            {getFileName(source.filename)}
          </span>
        );
      
      case 'title':
        return (
          <span className="text-sm text-gray-900">
            {source.title || '-'}
          </span>
        );
      
      case 'author':
        return (
          <span className="text-sm text-gray-900">
            {source.author || '-'}
          </span>
        );
      
      case 'year':
        return (
          <span className="text-sm text-gray-900">
            {source.year || '-'}
          </span>
        );
      
      case 'edition':
        return (
          <span className="text-sm text-gray-900">
            {source.edition || '-'}
          </span>
        );
      
      case 'publisher':
        return (
          <span className="text-sm text-gray-900">
            {source.publisher || '-'}
          </span>
        );
      
      case 'source_url':
        return source.source_url ? (
          <a
            href={source.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors duration-150"
          >
            <span className="text-sm">Link</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </a>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        );
      
      case 'actions':
        return (
          <Button
            variant="success"
            size="sm"
            onClick={() => handleEditClick(source)}
            disabled={disabled}
          >
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
              />
            </svg>
            Edit
          </Button>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {TABLE_COLUMNS.map((column) => (
                  <th 
                    key={column.key}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((source, index) => (
                <tr 
                  key={source.source_id} 
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50 transition-colors duration-150`}
                >
                  {TABLE_COLUMNS.map((column) => (
                    <td 
                      key={column.key}
                      className={`px-4 py-3 whitespace-nowrap ${column.className || ''}`}
                    >
                      {renderCell(source, column.key)}
                    </td>
                  ))}
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