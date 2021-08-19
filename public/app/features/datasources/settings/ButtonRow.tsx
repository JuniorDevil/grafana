import React, { FC } from 'react';
import { selectors } from '@grafana/e2e-selectors';

import config from 'app/core/config';
import { Button, LinkButton } from '@grafana/ui';

import { AccessControlAction } from 'app/types/';
import { contextSrv } from 'app/core/core';

export interface Props {
  isReadOnly: boolean;
  onDelete: () => void;
  onSubmit: (event: any) => void;
  onTest: (event: any) => void;
}

const ButtonRow: FC<Props> = ({ isReadOnly, onDelete, onSubmit, onTest }) => {
  const canEditDataSources = !isReadOnly && contextSrv.hasPermission(AccessControlAction.DataSourcesWrite);
  const canDeleteDataSources = contextSrv.hasPermission(AccessControlAction.DataSourcesDelete);

  return (
    <div className="gf-form-button-row">
      <LinkButton variant="secondary" fill="outline" href={`${config.appSubUrl}/datasources`}>
        Back
      </LinkButton>
      {canDeleteDataSources && (
        <Button
          type="button"
          variant="destructive"
          disabled={isReadOnly}
          onClick={onDelete}
          aria-label={selectors.pages.DataSource.delete}
        >
          Delete
        </Button>
      )}
      {canEditDataSources && (
        <Button
          type="submit"
          variant="primary"
          disabled={isReadOnly}
          onClick={(event) => onSubmit(event)}
          aria-label={selectors.pages.DataSource.saveAndTest}
        >
          Save &amp; test
        </Button>
      )}
      {!canEditDataSources && (
        <Button type="submit" variant="primary" onClick={onTest}>
          Test
        </Button>
      )}
    </div>
  );
};

export default ButtonRow;
