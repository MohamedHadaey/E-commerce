import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../../assets/images/notfound.svg';

export default function Notfound() {
  const { t } = useTranslation();

  return <>
    <div id="notfound">
      <div className="container mx-auto  px-5 py-10">
          <img src={notFoundImg} alt={t('notfound.alt')} className='w-full' style={{maxWidth: '600px', margin: '0 auto'}}/>
      </div>
    </div>
  </>
}
