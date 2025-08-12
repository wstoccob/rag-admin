'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RagSource } from '@/types/ragSource';
import { editSourceSchema, EditSourceFormData } from '@/lib/validation';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { CONSTANTS } from '@/lib/constants';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: RagSource | null;
  onSave: (updated: Partial<RagSource>) => Promise<void>;
  disabled?: boolean;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  source,
  onSave,
  disabled = false
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditSourceFormData>({
    resolver: zodResolver(editSourceSchema),
    defaultValues: {
      title: '',
      author: '',
      year: null,
      edition: '',
      publisher: '',
      source_url: '',
    }
  });

  useEffect(() => {
    if (source) {
      reset({
        title: source.title || '',
        author: source.author || '',
        year: source.year || null,
        edition: source.edition || '',
        publisher: source.publisher || '',
        source_url: source.source_url || '',
      });
    }
  }, [source, reset]);

  if (!isOpen || !source) return null;

  const onSubmit = async (data: EditSourceFormData) => {
    try {
      const cleanedData = {
        ...data,
        author: data.author || null,
        edition: data.edition || null,
        publisher: data.publisher || null,
        source_url: data.source_url || null,
        year: data.year || null,
      };

      await onSave(cleanedData);
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  const isFormDisabled = disabled || isSubmitting;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Edit Source</h2>
              <p className="text-sm text-gray-500 mt-1">ID: {source.source_id}</p>
            </div>
            {isSubmitting && (
              <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                <LoadingSpinner size={16} color="#3B82F6" />
                <span className="text-sm font-medium">Saving...</span>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <Input
                {...register('title')}
                label="Title"
                required
                error={errors.title?.message || undefined}
                placeholder="Enter title"
                disabled={isFormDisabled}
              />
            </div>

            {/* Author */}
            <Input
              {...register('author')}
              label="Author"
              placeholder="Enter author"
              disabled={isFormDisabled}
            />

            {/* Year */}
            <Input
              {...register('year', {
                setValueAs: (value) => value === '' ? null : parseInt(value)
              })}
              label="Year"
              type="number"
              error={errors.year?.message || undefined}
              placeholder="Enter year"
              min={CONSTANTS.VALIDATION.YEAR.MIN}
              max={CONSTANTS.VALIDATION.YEAR.MAX}
              disabled={isFormDisabled}
            />

            {/* Edition */}
            <Input
              {...register('edition')}
              label="Edition"
              placeholder="Enter edition"
              disabled={isFormDisabled}
            />

            {/* Publisher */}
            <Input
              {...register('publisher')}
              label="Publisher"
              placeholder="Enter publisher"
              disabled={isFormDisabled}
            />

            {/* Source URL */}
            <div className="md:col-span-2">
              <Input
                {...register('source_url')}
                label="Source URL"
                type="url"
                error={errors.source_url?.message || undefined}
                placeholder="https://example.com"
                disabled={isFormDisabled}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isFormDisabled}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};