import React from 'react';
import { Input } from '../../components/Input';
import styles from './BusinessBasicInfo.module.scss';

interface BusinessBasicInfoProps {}

export const BusinessBasicInfo: React.FC<BusinessBasicInfoProps> = () => {
  return (
    <div className={styles.businesBasicInfoContainer}>
      <p>
        Now that we've got your business name, we would love to know a little bit more about your
        business
      </p>
      <p>
        This will give us a chance to more accurately recommend your products to your potential
        customers
      </p>
      <Input labelName="What industry will your business be operating in?" type="text" />
      <Input labelName="Country of primary operation" type="text"></Input>
      <div className={styles.businessbasicInfoAreaInfo}>
        <Input labelName="City / Town" type="text" />
        <Input labelName="State / Province" type="text" />
        <Input labelName="Postal / Zip Code" type="text" />
      </div>
    </div>
  );
};
