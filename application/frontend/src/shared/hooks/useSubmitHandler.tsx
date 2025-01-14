import { useState, useCallback } from "react";

export function useSubmitHandler<T>(submitAction: (data: T) => Promise<void>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (data: T) => {
      if (isSubmitting) return; // 二重送信防止

      setIsSubmitting(true);
      try {
        await submitAction(data); // submitAction を呼び出し
      } catch (error) {
        console.error("送信中にエラーが発生しました:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [submitAction, isSubmitting]
  );

  return { handleSubmit, isSubmitting };
}
