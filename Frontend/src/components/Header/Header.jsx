import banner from 'assets/banner.png';

export default function Header() {
  return (
    <div className='border-b'>
      <img
        className='my-2 mx-auto w-32'
        src={banner}
        alt="logo shopper"
      />
    </div>
  )
}