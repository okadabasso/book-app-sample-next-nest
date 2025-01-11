'use client'
import { ClientSafeProvider, getCsrfToken, getProviders, signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IFormValues {
    username?: string;
    password?: string;
}

export default function CredentialSignIn(){
    const [error, setError] = useState<string>("");
    const [csrfToken, setCsrfToken] = useState<string>("");
    const { register, handleSubmit } = useForm<IFormValues>();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '';

    const [provider, setProvider] = useState<ClientSafeProvider | null>(null);
    useEffect(() => {
      (async () => {
          
        const providers = await getProviders();
        if(providers == null){
            return;
        }
        const credentialProvider = providers['credentials']
        setProvider(credentialProvider);

        const token = await getCsrfToken();
        setCsrfToken(token ?? '');
      })();
    }, []);
  
    const signInUser = async (data: IFormValues) => {
      await signIn<any>("credentials", {
        redirect: true,
        username: data.username,
        password: data.password,
        callbackUrl: callbackUrl,
      }).then((response) => {
        if (response?.error) {
          setError("UserId,Passwordを正しく入力してください");
        } 
      });
    };
    return(
        <div className="w-72 mt-8">
          <h4 className=" font-semibold">ユーザー名でログイン</h4>
      <form onSubmit={handleSubmit(signInUser)}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="mt-2">
          <input type="text" placeholder="user name" {...register("username")} className="w-full px-2 py-1 border rounded-sm border-gray-300 outline-1 outline-blue-400"></input>
        </div>
        <div className="mt-2">
          <input type="password" placeholder="password" autoComplete="true" {...register("password")} className="w-full px-2 py-1 border rounded-sm border-gray-300 outline-1 outline-blue-400"></input>
        </div>
        <p>
          <span style={{ color: "red" }}>{error}</span>
        </p>
        <div className="mt-4">
          <button type="submit" className="w-72 rounded px-4 py-2  border border-blue-600 bg-blue-500 font-semibold text-gray-50">ログイン</button>
        </div>
      </form>
        </div>
    )
}