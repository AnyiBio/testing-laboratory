import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import * as collection from 'common/mappers/collection.mapper';
import * as projectMapper from './project.mapper';

describe('pods/project', () => {
  it('should return an empty project when mapping null', () => {
    // Arrange
    const emptyModel = viewModel.createEmptyProject();
    const spy = jest.spyOn(viewModel, "createEmptyProject");

    // Act
    const returnModel = projectMapper.mapProjectFromApiToVm(null);
  
    // Assert
    expect(returnModel).toEqual(emptyModel);
    expect(spy).toBeCalledTimes(1);
  });

  it('should return an emptyProject when mapping undefined', () => {
    // Arrange
    const emptyModel = viewModel.createEmptyProject();
    const spy = jest.spyOn(viewModel, "createEmptyProject");

    // Act
    const returnModel = projectMapper.mapProjectFromApiToVm(undefined);
  
    // Assert
    expect(returnModel).toEqual(emptyModel);
    expect(spy).toBeCalledTimes(1);
  });

  it('should return required data when sending not optional data', () => {
    // Arrange
    const apiProject: apiModel.Project = {
      id: '1',
      isActive: true,
      name: 'test',
      employees: [],
    };

    // Act
    const result = projectMapper.mapProjectFromApiToVm(apiProject);

    // Assert
    expect(result).toEqual(apiProject);
  });

  it('should return data when sending not optional data and employees', () => {
    // Arrange

    const projectAPI: apiModel.Project = {
      id: '1',
      isActive: true,
      name: 'test',
      employees: [
        {
          employeeName: 'employee name',
          id: '1',
        },
      ],
    };

    const spy = jest.spyOn(collection, "mapToCollection" );
    // Act
    const result = projectMapper.mapProjectFromApiToVm(projectAPI);
    // Assert
    expect(result).toEqual(projectAPI);
    expect(result.employees).toHaveLength(1);
    expect(spy).toBeCalledTimes(1);
  });

  it('should return all data', () => {
    // Arrange
    const employees = [
      {
        id: '1',
        employeeName: 'employee name 1',
      },
      {
        id: '2',
        employeeName: 'employee name 2',
      },
    ];

    const projectAPI: apiModel.Project = {
      id: '1',
      isActive: true,
      name: 'test name',
      comments: "test comments",
      externalId: "1234",
      employees: employees ,
    };

    const spy = jest.spyOn(collection, "mapToCollection" );

    // Act
    const result = projectMapper.mapProjectFromApiToVm(projectAPI);

    // Assert
    expect(result).toEqual(projectAPI);
    expect(result.employees).toHaveLength(2);
    expect(spy).toBeCalledTimes(1);
  });
});