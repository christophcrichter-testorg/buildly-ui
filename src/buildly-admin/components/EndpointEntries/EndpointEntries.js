import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FjButton, FjTable, FjMenu } from '@buildlyio/freyja-react'
import { Redirect } from 'react-router-dom';
import { Crud } from '../../../midgard/modules/crud/Crud';
import crudDataReducer from '../../../midgard/modules/crud/redux/crud.reducer';


function EndpointEntries({ definitions, crudInputs, paths, endpointTitle, dispatch, data, loaded }) {
  const [tableOptions, setTableOptions] = useState({ columns: [] });
  const [filterValue, setFilterValue] = useState(null);
  const [menuState, setMenuState] = useState({opened: false, id: ''});
  const dropdownOptions = [
    {label: 'Delete', value: 'delete'}
  ];

  /**
   * defines table column for the endpoint for the required fields
   */
  useEffect(() => {
    if (definitions && definitions.properties) {
      let columns;
      let requiredColumns;
      // add first 2 properties to the table columns
      const propertiesColumns = Object.keys(definitions.properties).slice(0, 2).map(field => {
        return { name: field, prop: field, flex: 2, sortable: true };
      });
      // add required fields to the columns array
      if (definitions.required) {
        requiredColumns = definitions.required.map(field => {
          return {name: field, prop: field, flex: 2, sortable: true};
        });
        columns = [...propertiesColumns, ...requiredColumns].filter((value, index, self) => {
          return self.indexOf(value) === index;
        }); // get unique columns
      } else {
        columns = propertiesColumns;
      }
      setTableOptions({ columns });
    }
  }, [definitions, loaded]);

  /**
   * navigates to the form view of the selected item
   * @param item - the selected item from the table
   */
  const navigateToForm = (item) => {
    if (item) {
      return <Redirect push to={`admin-panel/${endpointTitle}/${item.id}`} />;
    } else {
      return <Redirect push to={`admin-panel/${endpointTitle}/new`} />;
    }
  }

  /**
   * template for actions column
   * @param row current row
   * @param crud crud object
   */
  const actionsTemplate = (row, crud) => {
    return <FjMenu
      menuItems={dropdownOptions}
      xPosition="right"
      yPosition="down"
      open={menuState.id === row.id ? menuState.opened: null}
      setOpen={() => setMenuState({opened: !menuState.opened, id: row.id})}
      onActionClicked={(action) => {
        if (action === 'delete') {
          return crud.deleteItem(row);
        }
      }}>
      <FjButton variant="secondary" size="small" onClick={() => setMenuState({opened: !menuState.opened, id: row.id})}>•••</FjButton>
    </FjMenu>
  };

  return (
    <React.Fragment>
      {paths && !paths[0][2].includes('get') && (
        <div className="endpoint-entries">
          <p>Cannot list entries for this endpoint.</p>
        </div>
      )}
      {paths && paths[0][2].includes('get') && (
        <div className="endpoint-entries">
          <div className="endpoint-entries__heading">
            <h3>{endpointTitle}</h3>
            <FjButton
              onClick={navigateToForm}
              size="small">
              New Entry
            </FjButton>
          </div>
          <div className="endpoint-entries__table">
            <Crud
              data={data}
              reducer={crudDataReducer}
              endPoint={endpointTitle}
              dispatch={dispatch}>
              {crud => {
                return (
                  loaded ? (
                    <FjTable
                      columns={[
                        ...tableOptions.columns,
                        { label: 'Actions', prop: 'options', template: (row) => actionsTemplate(row, crud), flex: '1' },
                      ]}
                      rows={crud.getData()}
                    />
                  ) : <div />
                )
              }}
            </Crud>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = (state, ownProps) => ({...ownProps, ...state.crudDataReducer[ownProps.endpointTitle]});

export default connect(mapStateToProps)(EndpointEntries);
