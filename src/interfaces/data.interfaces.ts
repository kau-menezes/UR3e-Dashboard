export interface IUR3eData {
    status: number

    tcp_pose: number[]
    temperatures: number[]
    
    main_voltage: number
    robot_voltage: number
    robot_ac: number
}
