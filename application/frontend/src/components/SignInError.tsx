  
  
  
  export default function SignInError({
    error
}: {error:string}) {

  return (
    <div className="text-red-700">sign in error {error}
    </div>
  );
}
