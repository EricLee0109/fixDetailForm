import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAttribute } from 'app/shared/model/attribute.model';
import { getEntities } from './attribute.reducer';

export const Attribute = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const attributeList = useAppSelector(state => state.attribute.entities);
  const loading = useAppSelector(state => state.attribute.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="attribute-heading" data-cy="AttributeHeading">
        <Translate contentKey="bookingCarApiApp.attribute.home.title">Những thuộc tính xe</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="bookingCarApiApp.attribute.home.refreshListLabel">Tạo mới danh sách</Translate>
          </Button>
          <Link to="/attribute/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="bookingCarApiApp.attribute.home.createLabel">Tạo mới thuộc tính xe</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {attributeList && attributeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="bookingCarApiApp.attribute.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bookingCarApiApp.attribute.attributeName">Tên thuộc tính</Translate>
                </th>
                <th>
                  <Translate contentKey="bookingCarApiApp.attribute.displayIndex">Vị trí</Translate>
                </th>
                <th>
                  <Translate contentKey="bookingCarApiApp.attribute.groupattribute">Nhóm thuộc tính</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {attributeList.map((attribute, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/attribute/${attribute.id}`} color="link" size="sm">
                      {attribute.id}
                    </Button>
                  </td>
                  <td>{attribute.attributeName}</td>
                  <td>{attribute.displayIndex}</td>
                  <td>
                    {attribute.groupattribute ? (
                      <Link to={`/group-attribute/${attribute.groupattribute.id}`}>{attribute.groupattribute.groupAttributeName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/attribute/${attribute.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">Xem</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/attribute/${attribute.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Sửa</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/attribute/${attribute.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="bookingCarApiApp.attribute.home.notFound">Không tìm thấy thuộc tính xe</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Attribute;
