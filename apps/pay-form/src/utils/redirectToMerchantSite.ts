import { notify } from "@poluspay-frontend/ui";

export const redirectToMerchantSite =  (url: string) => {
  notify({title: 'Back to merchant', loading: true})
  setTimeout(() => {
    window.location.href = url;
  }, 2000)
}
// TODO: redirect after successfully payment & QRCode payment also will be redirect after button click
