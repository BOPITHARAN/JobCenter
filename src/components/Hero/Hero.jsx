import {
  MapPin,
  Search,
  Sparkles,
  ArrowRight,
  Briefcase,
} from "lucide-react";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";


export default function Hero({ onSearch = () => {}, jobs = [] }) {

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Sri Lanka");


  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const moveX = useTransform(mouseX, [-500, 500], [-20, 20]);
  const moveY = useTransform(mouseY, [-500, 500], [-20, 20]);


  const jobCount = jobs.length;

  const availableJobs = jobs.slice(0, 4);



  const handleMouseMove = (e) => {

    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(
      e.clientX - rect.left - rect.width / 2
    );

    mouseY.set(
      e.clientY - rect.top - rect.height / 2
    );

  };



  const handleSearch = () => {

    onSearch({
      keyword: keyword.trim(),
      location: location.trim(),
    });


    document
      .getElementById("jobs")
      ?.scrollIntoView({
        behavior:"smooth"
      });

  };




  return (

<section
onMouseMove={handleMouseMove}
className="
relative
min-h-screen
overflow-hidden
bg-[#F0F3FA]
flex
items-center
"
>


{/* Glow Background */}

<div className="
absolute
-left-40
-top-40
h-[450px]
w-[450px]
rounded-full
bg-[#638ECB]/30
blur-[160px]
"
/>


<div className="
absolute
-right-40
-bottom-20
h-[400px]
w-[400px]
rounded-full
bg-[#8AAEE0]/40
blur-[160px]
"
/>




<div className="
relative
z-10
mx-auto
grid
max-w-7xl
w-full
grid-cols-1
gap-12
px-5
py-20
lg:grid-cols-2
lg:px-8
">



{/* LEFT */}


<div>


<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

className="
inline-flex
items-center
gap-2
rounded-full
border
border-[#B1C9EF]
bg-white/70
px-5
py-2
text-xs
font-black
text-[#395886]
backdrop-blur-xl
"

>

<Sparkles size={15}/>

KILI PEOPLE KILINOCHCHI

</motion.div>




<motion.h1

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="
mt-6
text-5xl
font-black
leading-none
tracking-tight
text-[#395886]
sm:text-6xl
"

>

Your Career

<br/>

<span
className="
bg-gradient-to-r
from-[#395886]
via-[#638ECB]
to-[#8AAEE0]
bg-clip-text
text-transparent
"
>

Starts Here

</span>

</motion.h1>




<p className="
mt-6
max-w-xl
text-lg
font-semibold
text-[#395886]/70
">

Discover premium jobs and build your future with Job Center Plus.

</p>




{/* Search Box */}

<div className="
mt-10
rounded-[30px]
border
bg-white/60
p-4
shadow-2xl
backdrop-blur-2xl
">


<div className="
grid
gap-3
md:grid-cols-[1fr_1fr_150px]
">


<SearchInput

icon={<Search size={18}/>}
label="WHAT"
value={keyword}
setValue={setKeyword}
placeholder="Job title"

/>



<SearchInput

icon={<MapPin size={18}/>}
label="WHERE"
value={location}
setValue={setLocation}
placeholder="Sri Lanka"

/>



<button

onClick={handleSearch}

className="
rounded-2xl
bg-gradient-to-r
from-[#395886]
to-[#638ECB]
text-white
font-black
"

>

Search

<ArrowRight
size={16}
className="inline ml-2"
/>

</button>


</div>

</div>





{/* Available Jobs */}


<div className="
mt-8
grid
gap-3
sm:grid-cols-2
">


{availableJobs.map((job,index)=>(


<motion.div

key={job.id || index}

animate={{
y:[0,-8,0]
}}

transition={{
duration:4,
repeat:Infinity,
delay:index
}}

className="
rounded-2xl
bg-white/60
p-4
shadow-xl
backdrop-blur-xl
"


>


<div className="flex gap-3 items-center">


<div className="
rounded-xl
bg-[#638ECB]
p-2
text-white
">

<Briefcase size={16}/>

</div>



<div>

<p className="
font-black
text-[#395886]
">

{
job.title ||
job.job_title ||
job.job_name ||
job.position ||
"Available Job"
}

</p>


<p className="
text-xs
text-[#395886]/60
">

{
job.location ||
job.job_location ||
"Sri Lanka"
}

</p>


</div>


</div>


</motion.div>


))}


</div>



</div>






{/* Dashboard */}



<motion.div

style={{
x:moveX,
y:moveY
}}

className="
hidden
lg:flex
items-center
justify-center
"


>


<div className="
w-[380px]
rounded-[40px]
border
border-white/40
bg-white/30
p-8
shadow-2xl
backdrop-blur-3xl
">


<h2 className="
text-2xl
font-black
text-[#395886]
">

Job Center Plus

</h2>



<div className="
mt-6
space-y-4
">


<DashboardCard
title="Available Jobs"
value={`${jobCount}+`}
/>


<DashboardCard
title="Companies"
value="100+"
/>


<DashboardCard
title="Applications"
value="2500+"
/>



</div>


</div>


</motion.div>




</div>


</section>


);

}




function DashboardCard({title,value}){

return (

<div className="
flex
justify-between
rounded-2xl
bg-white/70
p-4
">


<span className="font-bold text-[#395886]/70">

{title}

</span>


<span className="font-black text-[#395886]">

{value}

</span>


</div>

);

}






function SearchInput({
icon,
label,
value,
setValue,
placeholder
}){


return (

<div className="
flex
items-center
gap-3
rounded-2xl
bg-white/70
px-4
py-3
">


<div className="text-[#638ECB]">

{icon}

</div>


<div className="w-full">


<span className="
text-[10px]
font-black
text-[#395886]/60
">

{label}

</span>


<input

value={value}

onChange={(e)=>setValue(e.target.value)}

placeholder={placeholder}

className="
w-full
bg-transparent
outline-none
font-bold
text-[#395886]
"

/>


</div>


</div>

);

}