import {
  MapPin,
  Search,
  Sparkles,
  ArrowRight,
  Briefcase,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";

import heroDesktop from "../../assets/hero.png";
import heroMobile from "../../assets/hero-mobile.png";


export default function Hero({ onSearch = () => {}, jobs = [] }) {

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Sri Lanka");


  const latestJobs = jobs.slice(0, 3);


  const handleSearch = () => {

    onSearch({
      keyword: keyword.trim(),
      location: location.trim(),
    });


    document
      .getElementById("jobs")
      ?.scrollIntoView({
        behavior:"smooth",
      });

  };



return (

<section className="
relative
flex
items-center
overflow-hidden
pt-20
pb-12
sm:min-h-[85vh]
sm:py-0
">


{/* MOBILE IMAGE */}

<div
className="
absolute
inset-0
bg-cover
bg-center
md:hidden
"
style={{
backgroundImage:`url(${heroMobile})`
}}
/>



{/* DESKTOP IMAGE */}

<div
className="
absolute
inset-0
hidden
bg-cover
bg-[center_right]
md:block
"
style={{
backgroundImage:`url(${heroDesktop})`
}}
/>



{/* PREMIUM OVERLAY */}

<div className="
absolute
inset-0
bg-white/80
md:bg-gradient-to-r
md:from-white/95
md:via-white/80
md:to-transparent
"/>



{/* GLOW */}

<div className="
absolute
left-10
top-20
h-60
w-60
rounded-full
bg-[#638ECB]/20
blur-[120px]
"/>


<div className="
absolute
right-20
bottom-10
h-60
w-60
rounded-full
bg-[#8AAEE0]/30
blur-[120px]
"/>




<div className="
relative
z-10
mx-auto
w-full
max-w-7xl
px-4
py-8
sm:px-6
lg:px-8
">


<div className="max-w-3xl">



{/* BADGE */}

<motion.div

initial={{
opacity:0,
y:-10
}}

animate={{
opacity:1,
y:0
}}

className="
mb-6
inline-flex
items-center
gap-2
rounded-full
border
border-[#B1C9EF]/60
bg-white/80
px-4
py-2
text-xs
font-black
tracking-wider
text-[#395886]
shadow-md
backdrop-blur-xl
"

>

<Sparkles
size={14}
className="text-[#638ECB]"
/>

KILI PEOPLE KILINOCHCHI

</motion.div>





{/* TITLE */}

<motion.h1

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="
text-4xl
font-black
leading-tight
text-[#395886]
sm:text-5xl
md:text-[64px]
"

>

Find Your Next

<br/>


<span className="
bg-gradient-to-r
from-[#395886]
via-[#638ECB]
to-[#8AAEE0]
bg-clip-text
text-transparent
">

Dream Job

</span>


</motion.h1>





<motion.p

initial={{
opacity:0
}}

animate={{
opacity:1
}}

transition={{
delay:.2
}}

className="
mt-6
max-w-xl
text-sm
font-bold
leading-relaxed
text-[#395886]/80
sm:text-lg
"

>

Discover premium local and global jobs with one powerful career platform.

</motion.p>






{/* SEARCH BOX */}

<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:.3
}}

className="
mt-10
max-w-3xl
rounded-[28px]
border
border-white/70
bg-white/70
p-3
shadow-[0_20px_60px_rgba(57,88,134,.15)]
backdrop-blur-2xl
sm:p-4
"


>


<div className="
grid
grid-cols-1
gap-3
sm:grid-cols-[1fr_1fr_160px]
">


<SearchInput

icon={<Search size={18}/>}
label="What"
value={keyword}
setValue={setKeyword}
placeholder="Job title, keywords..."

/>



<SearchInput

icon={<MapPin size={18}/>}
label="Where"
value={location}
setValue={setLocation}
placeholder="Sri Lanka"

/>




<button

onClick={handleSearch}

className="
flex
min-h-[56px]
items-center
justify-center
gap-2
rounded-2xl
bg-gradient-to-r
from-[#395886]
via-[#638ECB]
to-[#8AAEE0]
font-black
text-white
shadow-lg
transition
hover:scale-[1.03]
"

>

Search Jobs

<ArrowRight size={16}/>

</button>



</div>

</motion.div>





{/* AVAILABLE JOB FLOAT CARDS */}


<div className="
mt-8
grid
gap-3
sm:grid-cols-3
">


{latestJobs.map((job,index)=>(


<motion.div

key={job.id || index}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:.4 + index*.1
}}

className="
rounded-2xl
border
border-white/60
bg-white/60
p-4
shadow-xl
backdrop-blur-xl
"


>


<div className="
flex
items-center
gap-3
">


<div className="
rounded-xl
bg-[#638ECB]
p-2
text-white
">

<Briefcase size={15}/>

</div>


<div>

<p className="
text-sm
font-black
text-[#395886]
">

{
job.title ||
job.job_title ||
job.job_name ||
"Available Job"
}

</p>


<p className="
text-xs
text-[#395886]/60
">

{
job.location ||
"Sri Lanka"
}

</p>


</div>


</div>


</motion.div>


))}


</div>




</div>


</div>


</section>

);

}






function SearchInput({
icon,
label,
value,
setValue,
placeholder
}) {


return (

<div className="
flex
items-center
gap-3
rounded-2xl
border
border-[#D5DEEF]
bg-[#F8FAFF]/80
px-4
py-3
focus-within:border-[#638ECB]
">


<div className="
rounded-xl
bg-white
p-2
shadow-sm
text-[#638ECB]
">

{icon}

</div>



<div className="w-full">


<span className="
text-[10px]
font-black
uppercase
tracking-wider
text-[#395886]/60
">

{label}

</span>


<input

value={value}

onChange={(e)=>