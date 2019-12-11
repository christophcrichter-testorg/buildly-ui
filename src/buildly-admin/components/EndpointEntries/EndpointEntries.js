import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FjButton, FjTable } from '@buildlyio/freyja-react'
import { Redirect } from 'react-router-dom';
import { Crud } from '../../../midgard/modules/crud/Crud';
import crudDataReducer from '../../../midgard/modules/crud/redux/crud.reducer';


function EndpointEntries({ definitions, crudInputs, paths, endpointTitle, dispatch, data }) {
  const [tableOptions, setTableOptions] = useState({ columns: [] });
  const [filterValue, setFilterValue] = useState(null);
  const dropdownOptions = [
    {label: '•••', value: '•••'},
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
        return {name: field, prop: field, flex: 2, sortable: true};
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
  }, [definitions]);

  /**
   * function that it is triggered to handle actions of the dropdown
   * @param action - the action that has been chosen
   * @param row - the row where the action is triggered
   */
  const dropdownActionTriggered = (row, action) => {
    if (action === 'delete') {
      crud.deleteItem(row);
    }
  }

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

  const templateTemplate = (row, crud) =>{
    return row.name;
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
                  <FjTable
                    columns={tableOptions.columns}
                    rows={[...crud.getData()]}
                  />
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
