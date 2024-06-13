'use client'
import { Toaster } from "react-hot-toast"
import { $openAuthPopup } from "@/api/auth"
import { useUnit } from "effector-react"
import { EarthoOneProvider } from '@eartho/one-client-react'
import { handleCloseAuthPopup } from "@/lib/utils/common"
import Layout from "./layout"
import { useEffect, useState } from "react"




const PagesLayout = ({ children }: { children: React.ReactNode }) => {

  const openAuthPopup = useUnit($openAuthPopup)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), [])

  return (
    <>
    {isClient && (
      <EarthoOneProvider clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`} domain=''>
  
        <Layout>{children}</Layout>
        <div className={`auth-overlay ${openAuthPopup ? 'overlay-active' : ''}`}
          onClick={handleCloseAuthPopup} />
        <Toaster position="top-center" reverseOrder={false} />
 
    </EarthoOneProvider>)} 
    </>
  
  )
}

export default PagesLayout