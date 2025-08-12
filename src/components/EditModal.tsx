'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RagSource } from '@/types/ragSource';
import { ClipLoader } from 'react-spinners';

const editSourceSchema = z.object({
    title: z.string().min(1, 'Title is required').trim(),
    author: z.string().trim().nullable(),
    year: z.number()
        .int('Year must be a whole number')
        .min(1000, 'Year must be after 1000')
        .max(new Date().getFullYear() + 1, 'Year cannot be in the future')
        .nullable()
        .optional(),
    edition: z.string().trim().optional(),
    publisher: z.string().trim().optional(),
    source_url: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
});

type EditSourceFormData = z.infer<typeof editSourceSchema>;

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
        setValue,
        watch
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
                                <ClipLoader size={16} color="#3B82F6" />
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('title')}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                } ${isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                                placeholder="Enter title"
                                disabled={isFormDisabled}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Author */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Author
                            </label>
                            <input
                                {...register('author')}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                                }`}
                                placeholder="Enter author"
                                disabled={isFormDisabled}
                            />
                        </div>

                        {/* Year */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year
                            </label>
                            <input
                                {...register('year', {
                                    setValueAs: (value) => value === '' ? null : parseInt(value)
                                })}
                                type="number"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.year ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                } ${isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                                placeholder="Enter year"
                                min="1000"
                                max={new Date().getFullYear() + 1}
                                disabled={isFormDisabled}
                            />
                            {errors.year && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.year.message}
                                </p>
                            )}
                        </div>

                        {/* Edition */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Edition
                            </label>
                            <input
                                {...register('edition')}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                                }`}
                                placeholder="Enter edition"
                                disabled={isFormDisabled}
                            />
                        </div>

                        {/* Publisher */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Publisher
                            </label>
                            <input
                                {...register('publisher')}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                                }`}
                                placeholder="Enter publisher"
                                disabled={isFormDisabled}
                            />
                        </div>

                        {/* Source URL */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Source URL
                            </label>
                            <input
                                {...register('source_url')}
                                type="url"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.source_url ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                } ${isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                                placeholder="https://example.com"
                                disabled={isFormDisabled}
                            />
                            {errors.source_url && (
                                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.source_url.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleClose}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                isSubmitting
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
                            }`}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                                isFormDisabled
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            }`}
                            disabled={isFormDisabled}
                        >
                            {isSubmitting && <ClipLoader size={16} color="white" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};