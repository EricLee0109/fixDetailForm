import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICarModel } from 'app/shared/model/car-model.model';
import { getEntities } from './car-model.reducer';

export const CarModel = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const carModelList = useAppSelector(state => state.carModel.entities);
  const loading = useAppSelector(state => state.carModel.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="car-model-heading" data-cy="CarModelHeading">
        <Translate contentKey="bookingCarApiApp.carModel.home.title">Danh sách các dòng xe</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="bookingCarApiApp.carModel.home.refreshListLabel">Làm mới danh sách</Translate>
          </Button>
          <Link to="/car-model/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="bookingCarApiApp.carModel.home.createLabel">Tạo mới 1 dòng xe</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {carModelList && carModelList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="bookingCarApiApp.carModel.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bookingCarApiApp.carModel.carModelName">Tên dòng xe</Translate>
                </th>
                <th>
                  <Translate contentKey="bookingCarApiApp.carModel.type">Loại xe</Translate>
                </th>
                <th>
                  <Translate contentKey="bookingCarApiApp.carModel.yearOfManufacture">Năm sản xuất </Translate>
                </th>
                <th>
                  <Translate contentKey="bookingCarApiApp.carModel.brand">Brand</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {carModelList.map((carModel, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/car-model/${carModel.id}`} color="link" size="sm">
                      {carModel.id}
                    </Button>
                  </td>
                  <td>{carModel.carModelName}</td>
                  <td>{carModel.type}</td>
                  <td>
                    {carModel.yearOfManufacture ? (
                      <TextFormat type="date" value={carModel.yearOfManufacture} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{carModel.brand ? <Link to={`/brand/${carModel.brand.id}`}>{carModel.brand.name}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/car-model/${carModel.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">Xem</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/car-model/${carModel.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Sửa</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/car-model/${carModel.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Xóa</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="bookingCarApiApp.carModel.home.notFound">Không tìm thấy dòng xe</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CarModel;
