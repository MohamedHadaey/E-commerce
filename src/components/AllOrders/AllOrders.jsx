import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import './AllOrders.css'
import { jwtDecode } from "jwt-decode";

function OrdersAccordion({ orders }) {
  const { t, i18n } = useTranslation();
  const dateLocale = i18n.language?.startsWith('ar') ? 'ar-EG' : 'en-US';

  return (
    <Accordion.Root type="single" collapsible className="w-full accordion mx-auto my-8 rounded-lg shadow">
      {orders.map((order, idx) => (
        <Accordion.Item key={order._id || idx} value={`item-${idx + 1}`} className=" accordion-item   last:border-b-0">
          <Accordion.Header>
            <Accordion.Trigger
              className={clsx(
                'w-full Accordion-Trigger flex justify-between items-center py-4 px-6 text-left font-semibold text-green-700 rtl:text-right',
                'focus:outline-none transition ',
                'group',
                'data-[state=open]:bg-green-50',
                'data-[state=open]:active'
              )}
            >
              <span>{t('orders.orderId', { id: order.id || order._id || idx + 1 })} <sub className="text-gray-400 mx-5"> {order.createdAt && new Date(order.createdAt).toLocaleDateString(dateLocale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}</sub></span>

              <span className="ml-2 rtl:ml-0 rtl:mr-2">
                <i className={clsx(
                  'fa-solid',
                  'transition-transform duration-200',
                  'text-green-400',
                  'group-data-[state=open]:fa-chevron-up',
                  'group-data-[state=closed]:fa-chevron-down',
                )}></i>
              </span>


              <p>

                <span className="t-price-span">
                  {t('orders.totalPrice')}:
                  <span style={{ minWidth: '100px', display: 'inline-block', padding: ' 0 3px' }}>
                    {order.totalOrderPrice} EGP
                  </span>
                </span>

                <span className='manage-order-btn'>
                  {t('orders.manageOrder')}
                  <i className={clsx(
                    'fa-solid',
                    'fa-caret-down',
                    'ml-1 rtl:ml-0 rtl:mr-1',
                    'transition-transform duration-200',
                    'group-data-[state=open]:fa-caret-up',
                    'group-data-[state=closed]:fa-caret-down'
                  )}></i>
                </span>
              </p>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up transition-all duration-300 px-6 py-4 bg-green-50 text-gray-700">
            <div className="flex flex-wrap gap-4 w-full mb-6">
              <section className="flex-1 min-w-[250px] bg-white rounded shadow-sm p-4">
                <h3 className="font-semibold text-green-700 mb-2">{t('orders.shippingAddress')}</h3>
                <div className="text-sm">
                  <div><span className="font-medium">{t('orders.details')}:</span> {order.shippingAddress?.details || t('common.na')}</div>
                  <div><span className="font-medium">{t('orders.city')}:</span> {order.shippingAddress?.city || t('common.na')}</div>
                  <div><span className="font-medium">{t('orders.phone')}:</span> {order.shippingAddress?.phone || t('common.na')}</div>
                </div>
              </section>
              <section className="flex-1 min-w-[250px] bg-white rounded shadow-sm p-4">
                <h3 className="font-semibold text-green-700 mb-2">{t('orders.userInfo')}</h3>
                <div className="text-sm">
                  <div><span className="font-medium">{t('orders.name')}:</span> {order.user?.name || t('common.na')}</div>
                  <div><span className="font-medium">{t('orders.email')}:</span> {order.user?.email || t('common.na')}</div>
                  <div><span className="font-medium">{t('orders.phone')}:</span> {order.user?.phone || t('common.na')}</div>
                </div>
              </section>
              <section className="flex-1 min-w-[250px] bg-white rounded shadow-sm p-4">
                <h3 className="font-semibold text-green-700 mb-2">{t('orders.paymentDeliveryStatus')}</h3>
                <div className="text-sm flex flex-col gap-1 mb-2">
                  <div><span className="font-medium">{t('orders.paid')}:</span> <span className={order.isPaid ? 'text-green-600' : 'text-red-500'}>{order.isPaid ? t('orders.yes') : t('orders.no')}</span></div>
                  <div><span className="font-medium">{t('orders.delivered')}:</span> <span className={order.isDelivered ? 'text-green-600' : 'text-red-500'}>{order.isDelivered ? t('orders.yes') : t('orders.no')}</span></div>
                  <div><span className="font-medium">{t('orders.paymentMethod')}:</span> <span className="text-gray-700">{order.paymentMethodType || t('common.na')}</span></div>
                </div>
                <div className="bg-gray-50 rounded p-2 text-xs">
                  <div className="flex justify-between mb-1"><span>{t('orders.shipping')}:</span> <span>{order.shippingPrice} EGP</span></div>
                  <div className="flex justify-between mb-1"><span>{t('orders.tax')}:</span> <span>{order.taxPrice} EGP</span></div>
                  <div className="flex justify-between font-semibold text-green-700"><span>{t('orders.total')}:</span> <span>{order.totalOrderPrice} EGP</span></div>
                </div>
              </section>
            </div>
            <section>
              <h3 className="font-semibold text-green-700 mb-2">{t('orders.cartItems')}</h3>
              <ul className="divide-y divide-gray-200">
                {order.cartItems?.map((item, i) => (
                  <li key={i} className="flex items-center py-3 gap-4">
                    <img src={item.product?.imageCover} alt={item.product?.title} className="w-16 h-16 object-cover rounded border" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{item.product?.title || t('common.product')}</div>
                      <div className="text-xs text-gray-500">{t('orders.brand')}: {item.product?.brand?.name || t('common.na')}</div>
                      <div className="text-xs text-gray-500">{t('orders.category')}: {item.product?.category?.name || t('common.na')}</div>
                    </div>
                    <div className="text-sm text-gray-700">x{item.count}</div>
                    <div className="text-green-700 font-semibold text-sm">{item.price} EGP</div>
                  </li>
                ))}
              </ul>
            </section>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export default function AllOrders() {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");

  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (e) {
      // invalid token
    }
  }

  function getAllOrders() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['orders', userId],
    queryFn: getAllOrders,
    enabled: !!userId,
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  const Orders = data?.data;

  if (isLoading) {
    return <>
      <div id="product-details">
        <div className="container mx-auto px-5 py-10 flex justify-center items-center">
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    </>
  }

  if (Orders == null || Orders == undefined || Orders.length == 0) {
    return <>
      <div className="container mx-auto py-10">
        <div className="p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-600">{t('orders.allOrders')}</h2>
          <div className="text-center text-gray-500 mb-6">
            <i className="fa-solid fa-box-open text-8xl my-10  text-green-400"></i>
            <p>{t('orders.noOrders')}</p>
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/products" >
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition hover:cursor-pointer">
                {t('orders.shopNow')}
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  } else {
    return <>
      <div className="container mx-auto py-10">
        <div className="p-8 mx-auto ">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-5">{t('orders.allOrders')}</h2>
          <p className='text-gray-500 mb-5 text-center'>{t('orders.trackShipments')}</p>
          <OrdersAccordion orders={Array.isArray(Orders) ? [...Orders].reverse() : Orders} />
        </div>
      </div>
    </>
  }
}
