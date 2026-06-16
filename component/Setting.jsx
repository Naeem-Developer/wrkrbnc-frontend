import React from 'react'
import axios from 'axios'
import { handleError, handleSuccess } from '@/frontend_utalties/notfication_control'
import { useRouter } from 'next/navigation'
import API_BASE_URL from '@/config/api'

const Setting = ({id}) => {
        const  router = useRouter();
    const handleDelete = async (e) => {
         e.preventDefault();


        try {
            const isConfirmed = window.confirm("Do you want to delete Account Permanently?");
            if (!isConfirmed) return;
            
            const deleteAccount = await axios.delete(`${API_BASE_URL}/deleteUser/${id}`);
            if (deleteAccount.data.success) {   
                setTimeout(() => {
                    handleSuccess("Account has been removed!");
                    router.push("/sign-up")
                }, 2000);
            }



        } catch (error) {
            handleError("User Not deleted.Try again");
            console.error("Error deleting account:", error);
        }


    }

    return (
        <>
            <div className="bg-white shadow-xl rounded-2xl p-6 space-y-8">
                <h2 className="text-xl font-semibold text-pink-600 mb-4">Account Settings</h2>


                {/* Delete Account */}
                <div>
                    <button
                      onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </>
    )
}

export default Setting
