// Using react-hot-toast for notifications
import toast from 'react-hot-toast'

// Success notification
export const notifySuccess = (message) => {
    toast.success(message, {
        duration: 3000,
        position: 'top-right',
    })
}

// Error notification
export const notifyError = (message) => {
    toast.error(message, {
        duration: 4000,
        position: 'top-right',
    })
}

// Loading notification
export const notifyLoading = (message) => {
    return toast.loading(message, {
        position: 'top-right',
    })
}

// Update loading toast
export const updateToast = (toastId, message, type = 'success') => {
    toast.dismiss(toastId)
    toast[type](message, {
        duration: 3000,
        position: 'top-right',
    })
}

// Info notification
export const notifyInfo = (message) => {
    toast(message, {
        duration: 3000,
        position: 'top-right',
        icon: 'ℹ️',
    })
}