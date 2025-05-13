import { Mail, Phone } from "lucide-react"

export default () => {
  return (

    <footer className="mt-20 sm:mt-32 mb-5 px-5 sm:px-2 h-20 csm:h-[4.5rem] flex justify-between items-center font-baloo font-normal ">
      <div className="flex sm:gap-8 justify-between items-center w-[80rem] mx-auto rounded-2xl px-5 sm:px-3 py-2 backdrop-blur-md bg-foreground/[0.04] sm:bg-foreground/5 shadow-md">

        <div>© 2025 coadal</div>
        <div className="flex flex-col">
          <span> footer content </span>
        </div>
        <div>
          <div className="flex justify-start py-1 items-center gap-5">
            <Mail className="w-4" /> email@gmail.com
          </div>
          <div className="flex justify-start py-1 items-center gap-5">
            <Phone className="w-4" /> +91 9999999999
          </div>
        </div>
      </div>
    </footer>
  )
}
