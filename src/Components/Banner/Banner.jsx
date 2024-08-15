import banner from '../../assets/images/banner/banner-1.jpg'
// import chefImg from './../../../assets/images/banner/bg-1.png'
const Banner = () => {
    return (
        <div style={{backgroundImage:`url('${banner}')`}} className="text-white hero min-h-screen bg-base-200 bg-cover bg-no-repeat h-[600px] relative top-24">
  <div className="hero-content flex-col lg:flex-row">
    {/* <img src={chefImg} className="max-w-sm rounded-lg shadow-2xl absolute left-0 bottom-0 border border-red-600" /> */}
    <div>
      <h1 className="text-5xl font-bold">Welcome To Our Realm</h1>
      <p className="py-6"> Step into a world where culinary artistry meets exceptional flavors, <br />and  embark on a gastronomic adventure unlike any other.</p>
      <h1 className='text-7xl'>This is</h1>
      <div className='text-9xl' style={{fontFamily:'DM Serif Display'}}>
      <p>Epicuream</p>
      <p className='ps-96'>Realm</p>
      </div>
    </div>
  </div>
</div>
    );
};

export default Banner;