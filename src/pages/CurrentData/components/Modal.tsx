export default function Modal({ isVisible, onClose, onUnlock }: any) {
    if (!isVisible) return null; // Render nothing if modal is not visible

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Unlock Protective Stop</h2>
                <p className="mb-6">Are you sure you want to unlock the protective stop? This action is irreversible.</p>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={onUnlock}
                    >
                        Unlock
                    </button>
                </div>
            </div>
        </div>
    );
}
