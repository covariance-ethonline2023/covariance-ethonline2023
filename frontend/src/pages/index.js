import { useAccount } from 'wagmi';

// import { Account, Connect, NetworkSwitcher } from './components';
import Stepper from './dashboard/create-campaign';

export function Home() {
  const { address } = useAccount();

  return (
    <>
      <Connect />

      {address && (
        <>
        <Stepper/>
          {/* <Account />
          <NetworkSwitcher /> */}
        </>
      )}
    </>
  );
}